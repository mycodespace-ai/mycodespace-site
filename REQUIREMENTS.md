# Requirements Register

This file is the project-level overview and index for accepted requirements.
Canonical detailed records belong under `engineering-docs/requirements/`.

## Current Requirements

### R-MYCODESPACE-001: MyCodeSpace landing page

Statement: A simple English website for https://mycodespace.ai, introducing
DevCapsule as the first product with more to follow, and briefly explaining
the larger ambition in plain, human English. Static Astro build, published to
Google Cloud Storage behind the shared HTTPS load balancer, serving both the
apex and `www`.

Priority: gating

Status: accepted (2026-11-01); delivered and live

Detailed contract:
[MyCodeSpace requirements](engineering-docs/requirements/2026-11-01-mycodespace-site.md).

Implementation:

- `site/`
- `scripts/gcs/`

Validation:

- `npm run build` in `site/`, then the smoke test in `WORKFLOW-LOCAL.md`.
