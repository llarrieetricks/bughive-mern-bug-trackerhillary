#!/bin/bash

# BugHive Setup Script - Initialize Backend and Frontend
# This script helps you set up the separated backend and frontend services

set -e

echo "🐛 BugHive - Backend & Frontend Setup Script"
echo "=============================================="
echo ""

# Function to setup a service
setup_service() {
  local service_name=$1
  local service_dir=$2

  echo "📦 Setting up $service_name..."
  echo "  Location: $service_dir"

  if [ ! -d "$service_dir" ]; then
    echo "  ❌ Error: $service_dir not found!"
    return 1
  fi

  cd "$service_dir"

  # Check if node_modules exists
  if [ ! -d "node_modules" ]; then
    echo "  Installing dependencies..."
    npm install
  else
    echo "  Dependencies already installed ✓"
  fi

  # Check if .env exists
  if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
      echo "  Creating .env from .env.example..."
      cp .env.example .env
      echo "  ⚠️  Please update .env with your values!"
    else
      echo "  ⚠️  No .env file found! Please create one."
    fi
  else
    echo "  .env file exists ✓"
  fi

  cd - > /dev/null
  echo "  ✅ $service_name setup complete!"
  echo ""
}

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Setup Backend
setup_service "Backend" "$SCRIPT_DIR/backend"

# Setup Frontend
setup_service "Frontend" "$SCRIPT_DIR/frontend"

echo "=============================================="
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Configure Environment Variables:"
echo "   - Edit backend/.env with your MongoDB URI and JWT Secret"
echo "   - Edit frontend/.env with your backend API URL"
echo ""
echo "2. Start Development Servers:"
echo "   - Backend:  cd backend && npm run dev"
echo "   - Frontend: cd frontend && npm run dev"
echo ""
echo "3. Access the Application:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend API: http://localhost:5001"
echo "   - API Docs: http://localhost:5001/api/docs"
echo ""
echo "📚 For more information, see:"
echo "   - SEPARATION_GUIDE.md - Backend/Frontend architecture"
echo "   - backend/README.md - Backend setup and deployment"
echo "   - frontend/README.md - Frontend setup and deployment"
echo ""
