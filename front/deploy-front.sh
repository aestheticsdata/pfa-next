#!/usr/bin/env bash
set -Eeuo pipefail

######################################
# Configuration
######################################
REMOTE_USER_HOST="debian@ks-b"
WEB_ROOT_BASE="/var/www/pfa"
CURRENT_DIR="$WEB_ROOT_BASE/public_html"
BACKUP_DIR="$WEB_ROOT_BASE/public_html.bak"
RELEASES_DIR="$CURRENT_DIR/releases"
BUILD_DIR="out"

# Allow running the script from any location
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
    WEB_ROOT_BASE="$WEB_ROOT_BASE" \
    'bash -s' << 'EOF'
set -Eeuo pipefail

cd "$WEB_ROOT_BASE"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ ERROR: No backup directory found at $BACKUP_DIR" >&2
  exit 1
fi

# Ensure CURRENT_DIR exists
mkdir -p "$CURRENT_DIR"
cd "$CURRENT_DIR"

TMP_RELEASES_DIR="$WEB_ROOT_BASE/.releases_tmp_rollback"

# Temporarily move releases/ out of CURRENT_DIR if it exists
if [ -d "releases" ]; then
  rm -rf "$TMP_RELEASES_DIR"
  mv "releases" "$TMP_RELEASES_DIR"
fi

# Remove all current app files (except releases/ we just moved out)
shopt -s dotglob
if compgen -G "*" > /dev/null; then
  rm -rf * 2>/dev/null || true
fi
shopt -u dotglob

# Restore releases/ into CURRENT_DIR
if [ -d "$TMP_RELEASES_DIR" ]; then
  mv "$TMP_RELEASES_DIR" "$CURRENT_DIR/releases"
fi

# Restore previous version from BACKUP_DIR into CURRENT_DIR
if [ -d "$BACKUP_DIR" ]; then
  shopt -s dotglob
  if compgen -G "$BACKUP_DIR/*" > /dev/null; then
    mv "$BACKUP_DIR"/* "$CURRENT_DIR"/ 2>/dev/null || true
  fi
  shopt -u dotglob
fi

# Cleanup backup directory
rm -rf "$BACKUP_DIR"
EOF
}

deploy() {
  cd "$SCRIPT_DIR"

  # ── Git metadata for release naming ─────────────────────────────
  local GIT_HASH
  GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "no-git")

  local GIT_BRANCH_RAW
  GIT_BRANCH_RAW=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "no-branch")

  # Sanitize branch name for use in directory names
  local GIT_BRANCH
  GIT_BRANCH=${GIT_BRANCH_RAW//\//-}
  GIT_BRANCH=${GIT_BRANCH// /_}

  local TIMESTAMP
  TIMESTAMP=$(date +'%Y%m%d-%H%M%S')

  # Example: release-20251115-153210-master-a1b2c3d
  local RELEASE_NAME="release-${TIMESTAMP}-${GIT_BRANCH}-${GIT_HASH}"
  local STAGING_DIR="$RELEASES_DIR/$RELEASE_NAME"
  local SWITCH_DONE="false"

  on_error() {
    local lineno=$1
    log "❌ ERROR: Deployment failed at line $lineno"

    if [[ "$SWITCH_DONE" == "true" ]]; then
      log "↩️  Auto rollback: switching back to previous version"
      if remote_rollback; then
        log "✅ Auto rollback succeeded"
      else
        log "❌ Auto rollback failed, manual intervention required"
      fi
    else
      log "ℹ️  No rollback needed: production was not modified yet"
    fi
  }

  # Trap errors only in this function
  trap 'on_error $LINENO' ERR

  log "➡️  Building front-end locally"
  rm -rf "$BUILD_DIR"
  pnpm build

  log "➡️  Preparing staging directory on remote server: $STAGING_DIR"

  ssh "$REMOTE_USER_HOST" \
    RELEASES_DIR="$RELEASES_DIR" \
    STAGING_DIR="$STAGING_DIR" \
    CURRENT_DIR="$CURRENT_DIR" \
    'bash -s' << 'EOF'
set -Eeuo pipefail

# Ensure releases directory exists inside CURRENT_DIR
mkdir -p "$RELEASES_DIR"

# Clean and recreate this specific staging release directory
rm -rf "$STAGING_DIR"
mkdir -p "$STAGING_DIR"
EOF

  log "➡️  Uploading build to staging directory"
  scp -r "$SCRIPT_DIR/$BUILD_DIR"/. "$REMOTE_USER_HOST:$STAGING_DIR/"

  log "➡️  Performing atomic release switch (with server-side backup, keeping releases/)"

  ssh "$REMOTE_USER_HOST" \
    CURRENT_DIR="$CURRENT_DIR" \
    BACKUP_DIR="$BACKUP_DIR" \
    STAGING_DIR="$STAGING_DIR" \
    WEB_ROOT_BASE="$WEB_ROOT_BASE" \
    'bash -s' << 'EOF'
set -Eeuo pipefail

cd "$WEB_ROOT_BASE"

if [ ! -d "$STAGING_DIR" ]; then
  echo "❌ ERROR: Staging directory $STAGING_DIR does not exist" >&2
  exit 1
fi

# Reset backup directory
rm -rf "$BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Ensure CURRENT_DIR exists
mkdir -p "$CURRENT_DIR"
cd "$CURRENT_DIR"

TMP_RELEASES_DIR="$WEB_ROOT_BASE/.releases_tmp_switch"

# Temporarily move releases/ out of CURRENT_DIR if it exists
if [ -d "releases" ]; then
  rm -rf "$TMP_RELEASES_DIR"
  mv "releases" "$TMP_RELEASES_DIR"
fi

# Move current app files (except releases/) into BACKUP_DIR
shopt -s dotglob
if compgen -G "*" > /dev/null; then
  mv * "$BACKUP_DIR"/ 2>/dev/null || true
fi
shopt -u dotglob

# Restore releases/ into CURRENT_DIR
if [ -d "$TMP_RELEASES_DIR" ]; then
  mv "$TMP_RELEASES_DIR" "$CURRENT_DIR/releases"
fi

# Copy new release from STAGING_DIR into CURRENT_DIR (keeping releases/)
cp -a "$STAGING_DIR"/. "$CURRENT_DIR"/

echo "✅ New release activated from $STAGING_DIR"
EOF

  # At this point, new release is live and backup exists
  SWITCH_DONE="true"

  log "➡️  Restarting nginx"
  ssh "$REMOTE_USER_HOST" "sudo systemctl restart nginx"

  # Everything went fine, clear the trap
  trap - ERR

  log "✅ Deployment completed successfully"
  log "ℹ️  Previous version is available in: $BACKUP_DIR"
  log "ℹ️  All releases are stored under: $RELEASES_DIR"
  log "ℹ️  You can manually rollback with: ./deploy-front.sh rollback"
}

rollback() {
  log "↩️  Manual rollback to previous version"
  if remote_rollback; then
    log "➡️  Restarting nginx"
    ssh "$REMOTE_USER_HOST" "sudo systemctl restart nginx"
    log "✅ Rollback completed. Previous version is now live."
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