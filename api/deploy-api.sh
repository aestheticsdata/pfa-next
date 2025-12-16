#!/usr/bin/env bash
set -Eeuo pipefail

######################################
# Configuration
######################################
REMOTE_USER_HOST="debian@ks-b"

# Base dir for the API on the server
API_ROOT="/var/www/pfa"

# Paths on the server
CURRENT_DIR="$API_ROOT/apiserver"
BACKUP_DIR="$API_ROOT/apiserver.bak"
RELEASES_DIR="$API_ROOT/apiserver-releases"

# Local project dir (script location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

######################################
# Utility functions
######################################

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*"
}

# Remote rollback helper (used by manual and auto rollback)
remote_rollback() {
  ssh "$REMOTE_USER_HOST" \
    CURRENT_DIR="$CURRENT_DIR" \
    BACKUP_DIR="$BACKUP_DIR" \
    API_ROOT="$API_ROOT" \
    'bash -s' << 'EOF'
set -Eeuo pipefail

cd "$API_ROOT"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ ERROR: No backup directory found at $BACKUP_DIR" >&2
  exit 1
fi

rm -rf "$CURRENT_DIR"
mv "$BACKUP_DIR" "$CURRENT_DIR"

echo "✅ API rollback done on server (restored from backup)"
EOF
}

deploy() {
  cd "$SCRIPT_DIR"

  ######################################
  # Git metadata for release naming
  ######################################

  local GIT_HASH
  GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "no-git")

  local GIT_BRANCH_RAW
  GIT_BRANCH_RAW=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "no-branch")

  local GIT_BRANCH
  GIT_BRANCH=${GIT_BRANCH_RAW//\//-}
  GIT_BRANCH=${GIT_BRANCH// /_}

  local TIMESTAMP
  TIMESTAMP=$(date +'%Y%m%d-%H%M%S')

  local RELEASE_NAME="release-${TIMESTAMP}-${GIT_BRANCH}-${GIT_HASH}"
  local RELEASE_DIR_REMOTE="$RELEASES_DIR/$RELEASE_NAME"
  local SWITCH_DONE="false"

  ######################################
  # Error handler (rollback if needed)
  ######################################
  on_error() {
    local lineno=$1
    log "❌ ERROR: API deployment failed at line $lineno"

    if [[ "$SWITCH_DONE" == "true" ]]; then
      log "↩️  Auto rollback: switching API back to previous version"
      if remote_rollback; then
        log "✅ Auto rollback succeeded"
        log "➡️  Restarting API with pm2 after rollback"
        ssh "$REMOTE_USER_HOST" \
          CURRENT_DIR="$CURRENT_DIR" \
          'bash -s' << 'EOF'
set -Eeuo pipefail
cd "$CURRENT_DIR"
pm2 restart ecosystem.config.js --env production
EOF
      else
        log "❌ Auto rollback failed, manual intervention required"
      fi
    else
      log "ℹ️  No rollback needed: API production was not modified yet"
    fi

  }  # ← FIX CRUCIAL : } doit être SEUL sur sa ligne !

  trap 'on_error $LINENO' ERR

  ######################################
  # Remote: prepare release directory
  ######################################
  log "➡️  Preparing release directory on server: $RELEASE_DIR_REMOTE"

  ssh "$REMOTE_USER_HOST" \
    RELEASES_DIR="$RELEASES_DIR" \
    RELEASE_DIR_REMOTE="$RELEASE_DIR_REMOTE" \
    API_ROOT="$API_ROOT" \
    'bash -s' << 'EOF'
set -Eeuo pipefail

mkdir -p "$API_ROOT"
mkdir -p "$RELEASES_DIR"

rm -rf "$RELEASE_DIR_REMOTE"
mkdir -p "$RELEASE_DIR_REMOTE"
EOF

  ######################################
  # Rsync source to release dir
  ######################################
  log "➡️  Syncing API source to release directory (rsync)"

  rsync -az \
    --delete \
    --exclude=".git" \
    --exclude="node_modules" \
    --exclude=".DS_Store" \
    --exclude="deploy-api.sh" \
    "$SCRIPT_DIR"/ \
    "$REMOTE_USER_HOST":"$RELEASE_DIR_REMOTE/"

  ######################################
  # Switch current ↔ backup
  ######################################
  log "➡️  Performing atomic API release switch with backup"

  ssh "$REMOTE_USER_HOST" \
    CURRENT_DIR="$CURRENT_DIR" \
    BACKUP_DIR="$BACKUP_DIR" \
    RELEASE_DIR_REMOTE="$RELEASE_DIR_REMOTE" \
    API_ROOT="$API_ROOT" \
    'bash -s' << 'EOF'
set -Eeuo pipefail

cd "$API_ROOT"

if [ ! -d "$RELEASE_DIR_REMOTE" ]; then
  echo "❌ ERROR: Release directory $RELEASE_DIR_REMOTE does not exist" >&2
  exit 1
fi

rm -rf "$BACKUP_DIR"

if [ -d "$CURRENT_DIR" ]; then
  mv "$CURRENT_DIR" "$BACKUP_DIR"
fi

mv "$RELEASE_DIR_REMOTE" "$CURRENT_DIR"

echo "✅ New API release activated at $CURRENT_DIR"
EOF

  SWITCH_DONE="true"

  ######################################
  # Fresh install + restart via pm2
  ######################################
  log "➡️  Installing dependencies on server with pnpm (fresh node_modules)"

  ssh "$REMOTE_USER_HOST" \
    CURRENT_DIR="$CURRENT_DIR" \
    'bash -s' << 'EOF'
set -Eeuo pipefail
cd "$CURRENT_DIR"

export PATH="$HOME/.local/share/pnpm:$PATH"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "❌ pnpm is not installed on this server (required for API deploy)" >&2
  exit 1
fi

rm -rf node_modules
pnpm install

pm2 restart ecosystem.config.js --env production
EOF

  trap - ERR

  log "✅ API deployment completed successfully"
  log "ℹ️  Previous API version is available in: $BACKUP_DIR"
  log "ℹ️  All API releases are stored under: $RELEASES_DIR"
  log "ℹ️  You can manually rollback with: ./deploy-api.sh rollback"
}

rollback() {
  log "↩️  Manual rollback to previous API version"
  if remote_rollback; then
    log "➡️  Restarting API with pm2 after rollback"
    ssh "$REMOTE_USER_HOST" \
      CURRENT_DIR="$CURRENT_DIR" \
      'bash -s' << 'EOF'
set -Eeuo pipefail
cd "$CURRENT_DIR"
pm2 restart ecosystem.config.js --env production
EOF
    log "✅ Manual API rollback completed. Previous version is now live."
  else
    log "❌ Rollback failed. Check server state manually."
    exit 1
  fi
}

######################################
# Script entry point
######################################

ACTION="${1:-deploy}"

case "$ACTION" in
  deploy)
    deploy
    ;;
  rollback)
   rollback
    ;;
  *)
    echo "Usage: $0 [deploy|rollback]"
    exit 1
    ;;
esac