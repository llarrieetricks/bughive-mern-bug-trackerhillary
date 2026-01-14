#!/bin/bash

# VS Code Setup Verification Script
# This script checks if all configuration is properly set up

echo "======================================"
echo "  VS Code Setup Verification"
echo "======================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter
PASSED=0
FAILED=0
WARNINGS=0

# Helper function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $2 (missing: $1)"
        ((FAILED++))
        return 1
    fi
}

# Helper function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASSED++))
        return 0
    else
        echo -e "${YELLOW}!${NC} $2 (missing: $1)"
        ((WARNINGS++))
        return 1
    fi
}

# Helper function to check command exists
check_command() {
    if command -v "$1" &> /dev/null; then
        local version=$($1 --version 2>/dev/null | head -n1)
        echo -e "${GREEN}✓${NC} $2 installed (${BLUE}$version${NC})"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $2 not found"
        ((FAILED++))
        return 1
    fi
}

echo -e "${BLUE}1. Checking required commands...${NC}"
echo ""
check_command "node" "Node.js"
check_command "npm" "npm"
check_command "mongod" "MongoDB"
check_command "git" "Git"
check_command "code" "VS Code CLI"
echo ""

echo -e "${BLUE}2. Checking project structure...${NC}"
echo ""
check_dir "frontend" "Frontend directory"
check_dir "backend" "Backend directory"
check_dir ".vscode" "VS Code config directory"
echo ""

echo -e "${BLUE}3. Checking configuration files...${NC}"
echo ""
check_file ".vscode/settings.json" "VS Code settings"
check_file ".vscode/launch.json" "Debug configurations"
check_file ".vscode/tasks.json" "Development tasks"
check_file ".vscode/extensions.json" "Recommended extensions"
check_file ".editorconfig" "Editor config"
check_file ".prettierrc" "Prettier config"
check_file ".prettierignore" "Prettier ignore"
echo ""

echo -e "${BLUE}4. Checking package.json files...${NC}"
echo ""
check_file "frontend/package.json" "Frontend dependencies"
check_file "backend/package.json" "Backend dependencies"
echo ""

echo -e "${BLUE}5. Checking node_modules...${NC}"
echo ""
check_dir "frontend/node_modules" "Frontend node_modules"
check_dir "backend/node_modules" "Backend node_modules"
echo ""

echo -e "${BLUE}6. Checking environment setup...${NC}"
echo ""

# Check MongoDB
if mongod --version &> /dev/null; then
    echo -e "${GREEN}✓${NC} MongoDB is installed"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} MongoDB not installed (required for backend)"
    ((FAILED++))
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 16 ]; then
    echo -e "${GREEN}✓${NC} Node.js version compatible ($(node -v))"
    ((PASSED++))
else
    echo -e "${YELLOW}!${NC} Node.js version $(node -v) - should be 16+ for MERN"
    ((WARNINGS++))
fi

# Check npm version
NPM_VERSION=$(npm -v | cut -d'.' -f1)
if [ "$NPM_VERSION" -ge 8 ]; then
    echo -e "${GREEN}✓${NC} npm version compatible ($(npm -v))"
    ((PASSED++))
else
    echo -e "${YELLOW}!${NC} npm version $(npm -v) - should be 8+ for modern packages"
    ((WARNINGS++))
fi

echo ""
echo -e "${BLUE}7. Checking port availability...${NC}"
echo ""

# Check port 5000 (backend)
if lsof -i :5000 > /dev/null 2>&1; then
    echo -e "${YELLOW}!${NC} Port 5000 already in use (backend port)"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} Port 5000 available for backend"
    ((PASSED++))
fi

# Check port 5173 (frontend)
if lsof -i :5173 > /dev/null 2>&1; then
    echo -e "${YELLOW}!${NC} Port 5173 already in use (frontend port)"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} Port 5173 available for frontend"
    ((PASSED++))
fi

# Check port 27017 (MongoDB)
if lsof -i :27017 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} MongoDB running on port 27017"
    ((PASSED++))
else
    echo -e "${YELLOW}!${NC} MongoDB not running (start with: mongod)"
    ((WARNINGS++))
fi

echo ""
echo -e "${BLUE}8. Checking documentation files...${NC}"
echo ""
check_file "VSCODE_CLEANUP.md" "Cleanup documentation"
check_file "VSCODE_TROUBLESHOOTING.md" "Troubleshooting guide"
check_file "VSCODE_QUICK_REFERENCE.md" "Quick reference card"
check_file ".vscode/README.md" "VS Code guide"
echo ""

# Summary
echo "======================================"
echo "  Verification Summary"
echo "======================================"
echo -e "  ${GREEN}Passed: $PASSED${NC}"
echo -e "  ${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "  ${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Setup verified successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Start MongoDB: mongod"
    echo "2. Open VS Code"
    echo "3. Run task: Tasks: Run Task → Start Both Servers"
    echo "4. Open browser: http://localhost:5173"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Setup verification failed!${NC}"
    echo ""
    echo "Issues found:"
    if [ ! -d "frontend/node_modules" ]; then
        echo "  - Install frontend: cd frontend && npm install"
    fi
    if [ ! -d "backend/node_modules" ]; then
        echo "  - Install backend: cd backend && npm install"
    fi
    if ! command -v mongod &> /dev/null; then
        echo "  - Install MongoDB: https://www.mongodb.com/try/download/community"
    fi
    echo ""
    exit 1
fi
