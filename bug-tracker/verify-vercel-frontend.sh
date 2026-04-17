#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "[1/4] Checking Vercel config"
if [[ ! -f "vercel.json" ]]; then
  echo "ERROR: vercel.json is missing."
  exit 1
fi

if ! grep -q 'npm install --prefix frontend' vercel.json; then
  echo "WARNING: vercel.json installCommand does not target frontend explicitly."
fi

if ! grep -q 'npm run build --prefix frontend' vercel.json; then
  echo "WARNING: vercel.json buildCommand does not target frontend explicitly."
fi

echo "[2/4] Checking frontend API env wiring"
if ! grep -q 'import.meta.env.VITE_API_URL' frontend/src/services/api.js; then
  echo "ERROR: frontend/src/services/api.js is not reading VITE_API_URL."
  exit 1
fi

if [[ -z "${VITE_API_URL:-}" ]]; then
  echo "INFO: VITE_API_URL is not set in this shell."
  echo "      This is okay for frontend preview mode."
  echo "      Set it in Vercel when your backend is deployed."
fi

echo "[3/4] Installing frontend dependencies"
if command -v pnpm >/dev/null 2>&1; then
  pnpm --dir frontend install --frozen-lockfile
  echo "[4/4] Building frontend with pnpm"
  pnpm --dir frontend build
else
  npm install --prefix frontend
  echo "[4/4] Building frontend with npm"
  npm run build --prefix frontend
fi

echo "OK: Frontend is build-ready for Vercel."