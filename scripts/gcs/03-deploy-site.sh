#!/usr/bin/env bash
# ==============================================================================
# Script 03: Build and Deploy Static Website to Google Cloud Storage
#
# Lessons Learned Incorporated:
# 1. Project parameterization: pass --project explicitly for rsync and object updates.
# 2. Automated build verification: verifies dist/ generation before uploading.
# 3. CDN Cache-Control headers: sets 1-year immutable caching on hashed assets
#    and short 5-minute caching on HTML to ensure instant cache flushes.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=scripts/gcs/common.sh
source "${SCRIPT_DIR}/common.sh"

check_gcloud

# No defaults: the targets come from site/scripts/deployment.env via deploy.sh.
BUCKET_NAME="${1:-${BUCKET_NAME:?Set BUCKET_NAME}}"
SITE_DIR="${2:-${SITE_DIR:?Set SITE_DIR}}"
PROJECT_ID="${3:-${PROJECT_ID:?Set PROJECT_ID}}"

REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
TARGET_DIR="${REPO_ROOT}/${SITE_DIR}"

if [ ! -d "${TARGET_DIR}" ]; then
  log_error "Site directory not found at ${TARGET_DIR}"
  exit 1
fi

log_info "Building static site in ${SITE_DIR}..."
cd "${TARGET_DIR}"

if command -v npm &>/dev/null; then
  npm run build
else
  log_error "npm not found. Please ensure Node.js is installed."
  exit 1
fi

if [ ! -f "${TARGET_DIR}/dist/index.html" ]; then
  log_error "Build did not generate ${TARGET_DIR}/dist/index.html. Aborting deployment."
  exit 1
fi

log_info "Syncing build output (${TARGET_DIR}/dist/) to gs://${BUCKET_NAME} in project [${PROJECT_ID}]..."
gcloud storage rsync "${TARGET_DIR}/dist" "gs://${BUCKET_NAME}" \
    --project="${PROJECT_ID}" \
    --recursive \
    --delete-unmatched-destination-objects

log_info "Setting optimal Cache-Control headers..."

# 1. Immutable hashed assets (_astro/) can be cached for 1 year at Google edge CDN
log_info "    - Setting 1-year cache on hashed assets (_astro/*)..."
gcloud storage objects update "gs://${BUCKET_NAME}/_astro/**" \
    --project="${PROJECT_ID}" \
    --cache-control="public, max-age=31536000, immutable" 2>/dev/null || true

# 2. HTML pages get 5-minute cache with revalidation for fresh content
log_info "    - Setting 5-minute cache on HTML pages..."
gcloud storage objects update "gs://${BUCKET_NAME}/**/*.html" \
    --project="${PROJECT_ID}" \
    --cache-control="public, max-age=300, must-revalidate" 2>/dev/null || true

log_success "Deployment of ${SITE_DIR} to gs://${BUCKET_NAME} finished successfully!"
