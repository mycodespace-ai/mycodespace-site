# Local Workflow: mycodespace-site

This is the project's own half of the workflow. `WORKFLOW.md` beside it is the
installed generic definition and binds wherever it speaks; this file governs
wherever it is silent. The headings below are the topics a project usually
needs to settle for itself. Fill the ones that apply, delete the ones that do
not, and add any this project needs that were not foreseen. Bootstrap wrote
this file once and will not touch it again. See *The Project's Local
Workflow* in `WORKFLOW.md`.

## Version Scheme

None: the site is not versioned. `site/package.json` carries a fixed `0.1.0`.

## Release Policy

None: the project cuts no releases. Publishing is a deployment of `main`; see
*Validation Commands*.

## Validation Commands

Every command runs from `site/`.

**Environment.** Node.js 22 (`node --version` prints `v22.x`; the capsule's
`node` capability provides it) and npm; then `npm ci`. Publishing additionally
needs the Google Cloud CLI; see *Host Capabilities*.

**Unit tests.** None: the site is two static pages and carries no test suite.

**Integration tests.** The static build: `npm run build`. It must finish with
zero errors and write `dist/index.html` and `dist/404.html`.

**End-to-end tests.** None automated.

**Smoke test.** `npm run preview`, then
`curl --fail --silent http://localhost:4329/` returns the home page. After a
deployment: `curl --fail --silent https://mycodespace.ai/` and
`https://www.mycodespace.ai/` return the page just built (compare with
`dist/index.html`; HTML is cached for five minutes).

**Gate.** Before a checkpoint and before integration, for a change under
`site/` or `scripts/`: `npm run build`, and `npm run deploy -- plan` when the
deployment scripts changed. A change to documentation or workflow files only
has no runtime gate; check the Markdown links it adds and `git diff --check`.

**Publishing.** `npm run deploy -- update` builds and synchronizes the live
bucket, deleting files the build no longer produces. It publishes to
production: there is no staging host. Run it only from an integrated `main`,
and record the smoke-test evidence in `CURRENT-STATUS.md`.

## Host Capabilities

- `gcloud`, signed in (`gcloud auth login`) as an account that can write
  objects in bucket `mycodespace-ai-site-central-trees-497510-h7` of project
  `central-trees-497510-h7`. `npm run deploy -- provision` additionally needs
  rights on that project's load balancer `chessclub-site` and Cloud DNS zone
  `mycodespace`. The CLI is not a DevCapsule capability; the developer
  installs it in the capsule home. Sign-in is interactive and expires, so an
  agent cannot renew it.
- The load balancer, its IP and the DNS zone are shared with the chess club
  preview sites; the scripts here touch only this site's resources.
- No CI publishes the site; publishing is a manual step from a developer's
  capsule.

## Exceptions

None.
