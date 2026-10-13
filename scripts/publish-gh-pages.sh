#!/usr/bin/env bash
#
# Build the static export of PORTÉ and publish it to the gh-pages branch
# of BrightZorbari1/porte-shop (GitHub Pages).
#
# Usage:
#   GITHUB_TOKEN=<token-with-repo-scope> bash scripts/publish-gh-pages.sh
#
set -euo pipefail

REPO="BrightZorbari1/porte-shop"
BAK="/tmp/_porte_api_backup"
OUT_DIR="$(pwd)/out"
PUB_DIR="$(mktemp -d /tmp/porte-pages.XXXXXX)"

cleanup() {
  if [ -d "$BAK" ]; then
    rm -rf src/app/api && mv "$BAK" src/app/api
  fi
  rm -rf "$PUB_DIR"
}
trap cleanup EXIT

echo "→ Building static export (database must be running + seeded)…"
rm -rf "$BAK" .static-next out
mv src/app/api "$BAK"                 # POST route handlers can't be statically exported
set +e
STATIC_EXPORT=1 npx next build
STATUS=$?
set -e
mv "$BAK" src/app/api
[ $STATUS -eq 0 ] || { echo "✗ Build failed"; exit $STATUS; }

touch out/.nojekyll                   # GH Pages: don't Jekyll-process _next/ assets

echo "→ Publishing out/ to gh-pages branch…"
cp -r "$OUT_DIR"/. "$PUB_DIR"
cd "$PUB_DIR"
git init -q -b gh-pages
git add -A
git -c user.name="porte-pages-bot" -c user.email="porte-pages@users.noreply.github.com" \
  commit -q -m "Static export build $(date -u +%Y-%m-%dT%H:%M:%SZ)"
if [ -n "${GITHUB_TOKEN:-}" ]; then
  git push -f "https://x-access-token:${GITHUB_TOKEN}@github.com/${REPO}.git" gh-pages:gh-pages
else
  git remote add origin "https://github.com/${REPO}.git"
  git push -f origin gh-pages:gh-pages
fi

echo "✓ Published — live at https://brightzorbari1.github.io/porte-shop/ once Pages finishes building."
