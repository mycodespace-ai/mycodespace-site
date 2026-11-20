#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
source "${SCRIPT_DIR}/deployment.env"
mode="${1:-plan}"
case "$mode" in
  plan|update|provision) ;;
  *) echo 'Usage: npm run deploy -- [plan|update|provision]' >&2; exit 2 ;;
esac
# Require explicit targets; the upload script has no defaults of its own.
: "${PROJECT_ID:?Set PROJECT_ID to the GCS project}"
: "${BUCKET_NAME:?Set BUCKET_NAME to a dedicated MyCodeSpace bucket}"
export PROJECT_ID BUCKET_NAME
if [[ "$mode" == provision ]]; then
  : "${LB_PROJECT_ID:?Set LB_PROJECT_ID to the existing load balancer project}"
  : "${EXISTING_LB_NAME:?Set EXISTING_LB_NAME to the existing load balancer prefix}"
  : "${DNS_PROJECT_ID:?Set DNS_PROJECT_ID to the Cloud DNS project}"
  : "${DNS_ZONE:?Set DNS_ZONE to the Cloud DNS zone}"
  export LB_PROJECT_ID EXISTING_LB_NAME DNS_PROJECT_ID DNS_ZONE
fi
printf 'Site: %s\nDomain: %s\nProject: %s\nBucket: gs://%s\nMode: %s\n' "$SITE_DIR" "$DOMAIN" "$PROJECT_ID" "$BUCKET_NAME" "$mode"
cd "$REPO_ROOT"
case "$mode" in
  plan) echo 'No cloud changes. update uploads dist; provision configures HTTPS for apex and www, apex A and www CNAME.' ;;
  update) bash scripts/gcs/03-deploy-site.sh ;;
  provision)
    node "${SCRIPT_DIR}/provision.mjs"
    ;;
esac
