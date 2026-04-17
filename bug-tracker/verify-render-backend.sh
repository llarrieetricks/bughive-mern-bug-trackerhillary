#!/bin/bash

# BugHive Backend Deployment Readiness Check
# Validates that the backend is ready for deployment to Render

set -e

echo "🔍 BugHive Backend Deployment Readiness Check"
echo "=============================================="
echo ""

FAILED=0

# [1/5] Check .env.production.example exists
echo "[1/5] Checking .env.production.example documentation..."
if [ -f "backend/.env.production.example" ]; then
  echo "✓ .env.production.example found"
else
  echo "✗ .env.production.example not found"
  FAILED=1
fi
echo ""

# [2/5] Check render.yaml exists
echo "[2/5] Checking render.yaml configuration..."
if [ -f "render.yaml" ]; then
  echo "✓ render.yaml found"
  if grep -q "bughive-backend" render.yaml; then
    echo "  ✓ Service name configured"
  fi
  if grep -q "node backend/server.js" render.yaml; then
    echo "  ✓ Start command configured"
  fi
else
  echo "✗ render.yaml not found"
  FAILED=1
fi
echo ""

# [3/5] Check backend package.json
echo "[3/5] Checking backend package.json..."
if [ ! -f "backend/package.json" ]; then
  echo "✗ backend/package.json not found"
  FAILED=1
else
  echo "✓ backend/package.json found"
  
  # Check for required dependencies
  if grep -q "express" backend/package.json; then
    echo "  ✓ Express.js dependency found"
  else
    echo "  ✗ Express.js dependency missing"
    FAILED=1
  fi
  
  if grep -q "mongoose" backend/package.json; then
    echo "  ✓ Mongoose dependency found"
  else
    echo "  ✗ Mongoose dependency missing"
    FAILED=1
  fi
  
  if grep -q "jsonwebtoken" backend/package.json; then
    echo "  ✓ JWT dependency found"
  else
    echo "  ✗ JWT dependency missing"
    FAILED=1
  fi
  
  if grep -q "bcryptjs" backend/package.json; then
    echo "  ✓ Bcrypt dependency found"
  else
    echo "  ✗ Bcrypt dependency missing"
    FAILED=1
  fi
fi
echo ""

# [4/5] Check backend entry point
echo "[4/5] Checking backend server.js..."
if [ ! -f "backend/server.js" ]; then
  echo "✗ backend/server.js not found"
  FAILED=1
else
  echo "✓ backend/server.js found"
  
  # Check for JWT_SECRET validation
  if grep -q "JWT_SECRET" backend/server.js; then
    echo "  ✓ JWT_SECRET validation added"
  else
    echo "  ⚠ JWT_SECRET validation not found (warning)"
  fi
  
  # Check for MONGO_URI validation
  if grep -q "MONGO_URI" backend/server.js && grep -q "process.exit" backend/server.js; then
    echo "  ✓ MONGO_URI validation added"
  else
    echo "  ⚠ MONGO_URI validation not found (warning)"
  fi
  
  # Check for health endpoint
  if grep -q "/api/health" backend/server.js; then
    echo "  ✓ Health check endpoint configured"
  else
    echo "  ⚠ Health check endpoint not found (recommended for monitoring)"
  fi
fi
echo ""

# [5/5] Check auth middleware
echo "[5/5] Checking authentication middleware..."
if [ ! -f "backend/middleware/auth.js" ]; then
  echo "✗ backend/middleware/auth.js not found"
  FAILED=1
else
  echo "✓ backend/middleware/auth.js found"
  
  if grep -q "process.env.JWT_SECRET" backend/middleware/auth.js; then
    echo "  ✓ JWT verification uses environment variable"
  else
    echo "  ✗ JWT verification not using environment variable"
    FAILED=1
  fi
fi
echo ""

# Summary
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo "✅ Backend is deployment-ready for Render!"
  echo ""
  echo "Next steps:"
  echo "1. Read RENDER_DEPLOYMENT_GUIDE.md for detailed instructions"
  echo "2. Set up MongoDB Atlas (free tier available)"
  echo "3. Deploy to Render:"
  echo "   - Visit https://render.com"
  echo "   - Create Web Service"
  echo "   - Connect your GitHub repository"
  echo "   - Add environment variables (MONGO_URI, JWT_SECRET, etc.)"
  echo "   - Deploy!"
  echo "4. Once live, update VITE_API_URL in Vercel frontend"
  echo ""
  exit 0
else
  echo "❌ Backend has issues that need to be fixed before deployment"
  echo "Review the errors above and fix them."
  exit 1
fi
