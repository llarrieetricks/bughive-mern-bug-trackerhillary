#!/bin/bash

# BugHive Deployment Setup Script
# Guides you through deploying to Vercel, Render, and MongoDB Atlas

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║       BugHive MERN Stack - Deployment Setup Guide          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to pause and wait for user
pause() {
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Check if git is clean
echo -e "${BLUE}Step 1: Preparing Repository${NC}"
echo "Checking git status..."
echo ""

if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes.${NC}"
    echo "It's recommended to commit all changes before deploying."
    echo ""
    echo "Uncommitted changes:"
    git status --short
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborting deployment."
        exit 1
    fi
else
    echo -e "${GREEN}✓ Repository is clean${NC}"
fi

pause

# Step 2: MongoDB Setup
echo -e "${BLUE}Step 2: Set Up MongoDB Atlas${NC}"
echo ""
echo "Follow these steps:"
echo "1. Visit: https://www.mongodb.com/cloud/atlas"
echo "2. Sign up with GitHub (easier!)"
echo "3. Create a new organization"
echo "4. Create M0 (Free) cluster"
echo "5. Wait for cluster to provision (2-3 minutes)"
echo "6. Security → Database Access → Add User"
echo "   Username: bughive_admin"
echo "   Password: [Generate strong password]"
echo "7. Security → Network Access → Allow 0.0.0.0/0 (temporary)"
echo "8. Click 'Databases' → 'Connect' → 'Drivers'"
echo "9. Copy connection string"
echo ""
read -p "Have you created MongoDB Atlas cluster and copied the connection string? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set up MongoDB Atlas first, then run this script again."
    exit 1
fi

read -p "Paste your MongoDB connection string (it will be hidden): " -s MONGO_URI
echo ""

pause

# Step 3: Backend Deployment
echo -e "${BLUE}Step 3: Deploy Backend to Render${NC}"
echo ""
echo "Follow these steps:"
echo "1. Visit: https://render.com"
echo "2. Sign up with GitHub"
echo "3. Click 'New+' → 'Web Service'"
echo "4. Select 'bughive-mern-bug-trackerhillary' repository"
echo "5. Configuration:"
echo "   - Name: bughive-backend"
echo "   - Environment: Node"
echo "   - Build Command: npm install --prefix backend"
echo "   - Start Command: node backend/server.js"
echo "6. Click 'Environment' → Add variables:"
echo "   - MONGODB_URI: [Your connection string]"
echo "   - JWT_SECRET: [Generate random 32-char string]"
echo "   - NODE_ENV: production"
echo "7. Click 'Create Web Service'"
echo "8. Wait for deployment (green 'Live' status)"
echo "9. Copy your backend URL"
echo ""
read -p "Have you deployed backend to Render? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please deploy backend first, then run this script again."
    exit 1
fi

read -p "Enter your Render backend URL (e.g., https://bughive-backend.onrender.com): " BACKEND_URL

pause

# Step 4: Update environment variables
echo -e "${BLUE}Step 4: Update Environment Variables${NC}"
echo ""
echo "Updating frontend/.env.production..."

# Update frontend environment file
cat > frontend/.env.production << EOF
VITE_API_URL=$BACKEND_URL
EOF

echo -e "${GREEN}✓ Updated frontend/.env.production${NC}"
echo ""

# Step 5: Commit changes
echo -e "${BLUE}Step 5: Commit Configuration Changes${NC}"
echo ""
git add frontend/.env.production vercel.json .prettierrc .prettierignore
git commit -m "Add production configuration and deployment settings" || echo "No changes to commit"
git push origin main

echo -e "${GREEN}✓ Pushed changes to GitHub${NC}"

pause

# Step 6: Frontend Deployment
echo -e "${BLUE}Step 6: Deploy Frontend to Vercel${NC}"
echo ""
echo "Follow these steps:"
echo "1. Visit: https://vercel.com/dashboard"
echo "2. Click 'Add New...' → 'Project'"
echo "3. Select 'Import an Existing Project'"
echo "4. Paste GitHub URL or connect GitHub"
echo "5. Select 'bughive-mern-bug-trackerhillary'"
echo "6. Project settings:"
echo "   - Framework: Vite"
echo "   - Root Directory: ./"
echo "7. Build Settings (override):"
echo "   - Build Command: npm install --prefix frontend && npm run build --prefix frontend"
echo "   - Output Directory: frontend/dist"
echo "8. Environment Variables:"
echo "   - VITE_API_URL: $BACKEND_URL"
echo "9. Click 'Deploy'"
echo "10. Wait for green checkmark (2-3 minutes)"
echo "11. Get your Vercel URL"
echo ""
read -p "Have you deployed frontend to Vercel? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please deploy frontend to Vercel first, then run this script again."
    exit 1
fi

read -p "Enter your Vercel frontend URL (e.g., https://bughive-mern-bug-trackerhillary.vercel.app): " FRONTEND_URL

pause

# Step 7: Testing
echo -e "${BLUE}Step 7: Testing Your Deployment${NC}"
echo ""
echo "Testing steps:"
echo "1. Open: $FRONTEND_URL"
echo "2. Verify page loads without errors"
echo "3. Test dark mode toggle"
echo "4. Create an account (register)"
echo "5. Login with your account"
echo "6. Create a new bug"
echo "7. Check browser DevTools → Network tab"
echo "   - API calls should go to: $BACKEND_URL"
echo "   - Should see 200/201 responses"
echo ""
read -p "Have you tested all features? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please test the deployment first."
    exit 1
fi

pause

# Step 8: Final checks
echo -e "${BLUE}Step 8: Final Security Checks${NC}"
echo ""
echo "Important security recommendations:"
echo "1. MongoDB Atlas IP Whitelist:"
echo "   - Security → Network Access"
echo "   - Remove '0.0.0.0/0' (allow everywhere)"
echo "   - Add only your Render server IP (shown in Render settings)"
echo "2. Verify .env files are in .gitignore"
echo "3. Verify no sensitive data in public directories"
echo ""
read -p "Have you completed security checks? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please complete security checks before going to production."
    exit 1
fi

pause

# Success!
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         🎉 Deployment Complete! 🎉                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Your BugHive app is now live!${NC}"
echo ""
echo "📍 Frontend URL: $FRONTEND_URL"
echo "📍 Backend API: $BACKEND_URL"
echo ""
echo "Next steps:"
echo "1. Share your app with friends!"
echo "2. Monitor Render logs for backend issues"
echo "3. Check Vercel Analytics for performance"
echo "4. Set up MongoDB Atlas backups (optional)"
echo "5. Add custom domain (optional)"
echo ""
echo "Documentation:"
echo "- Full guide: VERCEL_DEPLOYMENT_GUIDE.md"
echo "- Troubleshooting: VSCODE_TROUBLESHOOTING.md"
echo ""
echo "Questions? Check GitHub repository or AWS documentation."
echo ""
