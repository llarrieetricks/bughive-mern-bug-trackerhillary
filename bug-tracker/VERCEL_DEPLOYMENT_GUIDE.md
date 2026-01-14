# Vercel Deployment Guide for BugHive MERN Stack

## Overview

This guide covers deploying your BugHive MERN stack application to Vercel:
- **Frontend**: React + Vite → Vercel (Recommended)
- **Backend**: Express.js → Render or Railway (Vercel now charges for serverless functions)
- **Database**: MongoDB Atlas (Cloud-hosted MongoDB)

---

## Phase 1: Prepare Your Repository

### Step 1: Verify Git Repository

```bash
# Check current status
cd /home/hillary/bug-tracker
git status
git log --oneline -3

# Expected output: Your repository should be up-to-date on GitHub
```

### Step 2: Create Environment Files

**Frontend Environment** (`.env.production`):
```
VITE_API_URL=https://your-backend-url.com
```

**Backend Environment** (`.env`):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bughive
PORT=5000
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key_here
```

---

## Phase 2: Deploy Backend API

### Option A: Deploy to Render (Recommended for Node.js)

#### Step 1: Create Render Account
1. Visit https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your repositories

#### Step 2: Create Web Service
1. Click "New+" → "Web Service"
2. Select your `bughive-mern-bug-trackerhillary` repository
3. Fill in configuration:
   - **Name**: `bughive-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Build Command**: `npm install --prefix backend`
   - **Start Command**: `node backend/server.js`
   - **Restart Policy**: `On Failure`

#### Step 3: Add Environment Variables
In Render dashboard:
1. Go to your service → Environment
2. Add variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bughive
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```

#### Step 4: Deploy
- Click "Deploy"
- Wait for green "Live" status
- Copy your backend URL: `https://bughive-backend.onrender.com`

### Option B: Deploy to Railway

#### Step 1: Create Railway Account
1. Visit https://railway.app
2. Sign up with GitHub
3. Authorize Railway

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `bughive-mern-bug-trackerhillary`

#### Step 3: Add Environments
1. Variables → Add Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bughive
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   PORT=8000
   ```

#### Step 4: Configure Start Command
1. Go to Settings
2. Start command: `npm install --prefix backend && node backend/server.js`

#### Step 5: Deploy
- Click "Deploy"
- Get your backend URL from Railway dashboard

---

## Phase 3: Set Up MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up with Google/GitHub
3. Create a new organization (or skip if using default)

### Step 2: Create Cluster
1. Click "Create a Deployment"
2. Choose "M0 Free" tier (perfect for learning/hobby projects)
3. Select region closest to you
4. Click "Create Deployment"

### Step 3: Create Database User
1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Create username/password (save these!)
   - **Username**: `bughive_admin`
   - **Password**: Generate secure password
4. Select role: "Atlas Admin"
5. Click "Add User"

### Step 4: Add IP Whitelist
1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0) for development
   - **Note**: For production, use specific IPs
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Databases" → "Connect"
2. Choose "Drivers"
3. Select "Node.js" version
4. Copy connection string:
   ```
   mongodb+srv://bughive_admin:<password>@cluster0.xxxxx.mongodb.net/bughive?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

---

## Phase 4: Deploy Frontend to Vercel

### Step 1: Vercel Account Setup (Already done based on screenshot)
You're already on Vercel! Continue with the import flow.

### Step 2: Configure Import Settings

When importing the repository, you'll see:

**Project Name**: `bughive-mern-bug-trackerhillary` (already filled)

**Framework Preset**: Select "Vite"

**Root Directory**: `./` (leave default)

**Build and Output Settings**:
- Click "Edit" in "Build and Output Settings"
- **Build Command**: `npm install --prefix frontend && npm run build --prefix frontend`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install`

### Step 3: Environment Variables

Before deploying, add environment variables:

1. In Vercel → Project Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
   Replace with your actual backend URL from Render/Railway

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy automatically
3. Wait for green "Production" deployment
4. Get your frontend URL: `https://bughive-mern-bug-trackerhillary.vercel.app`

---

## Phase 5: Update Configuration

### Step 1: Update Frontend API URL

Once backend is deployed, update `.env.production`:

```bash
# Frontend/.env.production
VITE_API_URL=https://bughive-backend.onrender.com
```

Then redeploy:
```bash
git add frontend/.env.production
git commit -m "Update API URL for production"
git push origin main
```

Vercel will auto-redeploy.

### Step 2: Update CORS in Backend

In `backend/server.js`, update CORS to allow your frontend URL:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',           // Development
    'https://bughive-mern-bug-trackerhillary.vercel.app' // Production
  ],
  credentials: true
}));
```

---

## Phase 6: Testing

### Test Frontend
```bash
# Visit your Vercel URL
https://bughive-mern-bug-trackerhillary.vercel.app

# Expected: BugHive app loads
# Dark mode works
# Theme persists
```

### Test Backend Connection
```bash
# In browser DevTools → Network tab
# Try login/register
# Should see API calls to your backend URL
# Responses should return user data
```

### Test MongoDB Connection
```bash
# Check server logs in Render/Railway dashboard
# Should see: "MongoDB Connected"
# Or use MongoDB Atlas → Metrics to see active connections
```

---

## Troubleshooting

### Frontend Won't Build on Vercel

**Error**: `npm: command not found`

**Solution**:
1. Go to Project Settings → General
2. Verify Node.js version (should be 18+)
3. Check build command is correct
4. Try: `cd frontend && npm install && npm run build`

### Backend Not Connecting

**Error**: `MongoDB connection failed`

**Solution**:
1. Check MongoDB URI in environment variables (Render/Railway)
2. Verify IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
3. Test connection: `mongosh "mongodb+srv://..."`

### CORS Errors

**Error**: `No 'Access-Control-Allow-Origin' header`

**Solution**:
1. Update backend CORS to include frontend URL
2. Redeploy backend
3. Clear browser cache (Ctrl+Shift+Delete)
4. Test API call again

### Environment Variables Not Loading

**Error**: API calls return 401 or undefined variables

**Solution**:
1. Verify all env vars are set in Vercel/Render/Railway
2. Restart deployment
3. Check variable names match exactly
4. Don't commit `.env` files to Git!

---

## Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render/Railway
- [ ] MongoDB Atlas cluster running
- [ ] Environment variables set in all platforms
- [ ] CORS configured for production URLs
- [ ] Login/Register working
- [ ] Bug creation/listing working
- [ ] Dark mode working
- [ ] API calls successful (check Network tab)
- [ ] No console errors in DevTools
- [ ] Mobile responsive design works
- [ ] Git repository clean and pushed

---

## Production Security Tips

1. **Change MongoDB Atlas IP Whitelist** (after testing):
   - Remove "Allow from Anywhere"
   - Add only your Render/Railway server IPs

2. **Secure JWT Secret**:
   - Use strong, random string (32+ characters)
   - Store only in environment variables
   - Never commit to Git

3. **Enable HTTPS** (Vercel/Render/Railway do this automatically)

4. **Set NODE_ENV=production** in backend environment

5. **Disable debug logging** in production:
   ```javascript
   if (process.env.NODE_ENV !== 'production') {
     console.log('Debug info...')
   }
   ```

---

## Useful URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Vercel Dashboard | https://vercel.com/dashboard | Manage frontend deployment |
| Render Dashboard | https://dashboard.render.com | Manage backend deployment |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas | Manage database |
| Your Frontend | `https://bughive-mern-bug-trackerhillary.vercel.app` | Live app |
| Your Backend | `https://bughive-backend.onrender.com` | API endpoint |

---

## Quick Reference Commands

```bash
# Check current git status
git status

# Push changes to GitHub
git add .
git commit -m "Your message"
git push origin main

# Test backend locally before deploying
cd backend
PORT=5000 node server.js

# Test frontend build locally
cd frontend
npm run build
npm run preview  # Preview production build
```

---

## Next Steps

1. **Choose backend host**: Render (recommended) or Railway
2. **Set up MongoDB Atlas**: Create free cluster
3. **Get connection string**: From MongoDB Atlas
4. **Deploy backend**: To Render/Railway
5. **Update frontend env**: Add backend URL
6. **Deploy frontend**: To Vercel
7. **Test everything**: Login, create bugs, dark mode
8. **Monitor logs**: Check Render/Railway logs for errors

**Estimated time**: 30-45 minutes for first-time setup

Need help with any specific step? Let me know!
