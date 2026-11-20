#!/usr/bin/env bash
# ==============================================================================
# Shared helpers for the GCS upload script
# ==============================================================================

# Ensure gcloud is found in PATH if installed in user xtras
if ! command -v gcloud &>/dev/null; then
  if [ -x "/home/devcapsule/xtras/google-cloud-sdk/bin/gcloud" ]; then
    export PATH="/home/devcapsule/xtras/google-cloud-sdk/bin:$PATH"
  elif [ -x "${HOME}/xtras/google-cloud-sdk/bin/gcloud" ]; then
    export PATH="${HOME}/xtras/google-cloud-sdk/bin:$PATH"
  fi
fi

# Terminal colors
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_info() {
  echo -e "${BLUE}${BOLD}==>${NC} $*"
}

log_success() {
  echo -e "${GREEN}${BOLD}✔${NC} $*"
}

log_warn() {
  echo -e "${YELLOW}${BOLD}⚠${NC} $*"
}

log_error() {
  echo -e "${RED}${BOLD}✖${NC} $*" >&2
}

# Verify gcloud authentication
check_gcloud() {
  if ! command -v gcloud &>/dev/null; then
    log_error "gcloud CLI not found in PATH. Please install Google Cloud SDK."
    exit 1
  fi
  local active_account
  active_account="$(gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null || true)"
  if [ -z "${active_account}" ]; then
    log_error "No active gcloud account authenticated. Run: gcloud auth login"
    exit 1
  fi
}
