// Scoped, repeatable provisioning for MyCodeSpace; leaves unrelated routes intact.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const env = process.env;
for (const key of [
  "PROJECT_ID",
  "BUCKET_NAME",
  "LB_PROJECT_ID",
  "EXISTING_LB_NAME",
  "DNS_PROJECT_ID",
  "DNS_ZONE",
]) {
  if (!env[key]) throw new Error(`Missing ${key}; run through deploy.sh`);
}
const gcloud = existsSync("/home/devcapsule/xtras/google-cloud-sdk/bin/gcloud")
  ? "/home/devcapsule/xtras/google-cloud-sdk/bin/gcloud"
  : "gcloud";
function run(args, json = false) {
  const result = spawnSync(
    gcloud,
    [...args, ...(json ? ["--format=json"] : []), "--quiet"],
    { encoding: "utf8" },
  );
  if (result.status !== 0)
    throw new Error(`${args[0]} ${args[1]}: ${result.stderr}`);
  if (!json) process.stdout.write(result.stdout + result.stderr);
  return json ? JSON.parse(result.stdout) : result.stdout;
}
const project = `--project=${env.PROJECT_ID}`;
const lbProject = `--project=${env.LB_PROJECT_ID}`;
const dnsProject = `--project=${env.DNS_PROJECT_ID}`;
const zone = `--zone=${env.DNS_ZONE}`;
const prefix = env.EXISTING_LB_NAME;
const map = `${prefix}-url-map`;
const proxy = `${prefix}-https-proxy`;
const cert = "mycodespace-ai-apex-www-cert";
const backend = "mycodespace-ai-site-backend";
const matcher = "mycodespace-ai-site-matcher";
const hosts = ["mycodespace.ai", "www.mycodespace.ai"];
const bucket = `gs://${env.BUCKET_NAME}`;
// Preflight shared resources and DNS before mutation.
run(["compute", "url-maps", "describe", map, lbProject, "--global"], true);
run(
  ["compute", "target-https-proxies", "describe", proxy, lbProject, "--global"],
  true,
);
const ip = run(
  [
    "compute",
    "forwarding-rules",
    "describe",
    `${prefix}-https-rule`,
    lbProject,
    "--global",
  ],
  true,
).IPAddress;
if (!ip) throw new Error("No shared load balancer IP");
let records = run(["dns", "record-sets", "list", dnsProject, zone], true);
for (const record of records.filter((r) =>
  hosts.map((h) => h + ".").includes(r.name),
)) {
  if (
    (record.name === "mycodespace.ai." &&
      ["AAAA", "CNAME"].includes(record.type)) ||
    (record.name === "www.mycodespace.ai." && !["CNAME"].includes(record.type))
  ) {
    throw new Error(
      `Conflicting DNS: ${record.name} ${record.type}; reconcile explicitly`,
    );
  }
}
const buckets = run(["storage", "buckets", "list", project], true);
if (
  !buckets.some(
    (b) =>
      b.name === env.BUCKET_NAME ||
      b.name === bucket ||
      b.storage_url === bucket + "/",
  )
) {
  run([
    "storage",
    "buckets",
    "create",
    bucket,
    project,
    `--location=${env.LOCATION || "europe-north1"}`,
    "--uniform-bucket-level-access",
    "--no-public-access-prevention",
  ]);
}
run([
  "storage",
  "buckets",
  "update",
  bucket,
  project,
  "--web-main-page-suffix=index.html",
  "--web-error-page=404.html",
]);
// Do not broaden project-wide organization policy if this binding is rejected.
run([
  "storage",
  "buckets",
  "add-iam-policy-binding",
  bucket,
  project,
  "--member=allUsers",
  "--role=roles/storage.objectViewer",
]);
const deploy = spawnSync("bash", ["scripts/gcs/03-deploy-site.sh"], {
  cwd: fileURLToPath(new URL("../../", import.meta.url)),
  env,
  stdio: "inherit",
});
if (deploy.status !== 0) throw new Error("Static build/upload failed");
const backends = run(["compute", "backend-buckets", "list", lbProject], true);
const existingBackend = backends.find((b) => b.name === backend);
if (existingBackend && existingBackend.bucketName !== env.BUCKET_NAME)
  throw new Error("Backend points to another bucket");
if (!existingBackend)
  run([
    "compute",
    "backend-buckets",
    "create",
    backend,
    lbProject,
    `--gcs-bucket-name=${env.BUCKET_NAME}`,
    "--enable-cdn",
    "--cache-mode=USE_ORIGIN_HEADERS",
  ]);
const certs = run(
  ["compute", "ssl-certificates", "list", lbProject, "--global"],
  true,
);
const existingCert = certs.find((c) => c.name === cert);
if (
  existingCert &&
  JSON.stringify([...existingCert.managed.domains].sort()) !==
    JSON.stringify([...hosts].sort())
)
  throw new Error("Certificate domains differ");
if (!existingCert)
  run([
    "compute",
    "ssl-certificates",
    "create",
    cert,
    lbProject,
    "--global",
    `--domains=${hosts.join(",")}`,
  ]);
const currentProxy = run(
  ["compute", "target-https-proxies", "describe", proxy, lbProject, "--global"],
  true,
);
const certificates = currentProxy.sslCertificates.map((c) =>
  c.split("/").pop(),
);
if (!certificates.includes(cert))
  run([
    "compute",
    "target-https-proxies",
    "update",
    proxy,
    lbProject,
    "--global",
    `--ssl-certificates=${[...certificates, cert].join(",")}`,
  ]);
const currentMap = run(
  ["compute", "url-maps", "describe", map, lbProject, "--global"],
  true,
);
const collisions = (currentMap.hostRules || []).filter((r) =>
  r.hosts.some((h) => hosts.includes(h)),
);
if (collisions.length) {
  const rule = collisions[0];
  const target = (currentMap.pathMatchers || []).find(
    (m) => m.name === rule.pathMatcher,
  );
  if (
    collisions.length !== 1 ||
    !hosts.every((h) => rule.hosts.includes(h)) ||
    !target?.defaultService.endsWith("/" + backend)
  )
    throw new Error("Existing host routing differs; reconcile explicitly");
} else
  run([
    "compute",
    "url-maps",
    "add-path-matcher",
    map,
    lbProject,
    "--global",
    `--default-backend-bucket=${backend}`,
    `--path-matcher-name=${matcher}`,
    `--new-hosts=${hosts.join(",")}`,
  ]);
// Independent record updates preserve MX/TXT and all neighboring host records.
for (const [name, type, value] of [
  ["mycodespace.ai.", "A", ip],
  ["www.mycodespace.ai.", "CNAME", "mycodespace.ai."],
]) {
  const existing = records.find((r) => r.name === name && r.type === type);
  if (existing?.rrdatas.length === 1 && existing.rrdatas[0] === value) continue;
  run([
    "dns",
    "record-sets",
    existing ? "update" : "create",
    name,
    dnsProject,
    zone,
    `--type=${type}`,
    "--ttl=300",
    `--rrdatas=${value}`,
  ]);
}
console.log(
  `Deployed content and configured both hosts at ${ip}. Certificate activation may take time.`,
);
