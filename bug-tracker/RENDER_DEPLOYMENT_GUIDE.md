# Render Deployment Guide for BugHive Backend

This guide walks you through deploying the BugHive backend (Express.js API) to Render.com.

## Prerequisites

- GitHub account with the BugHive repository
- Render account (free tier available at https://render.com)
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
- Your Vercel frontend URL (from frontend deployment)

## Phase 1: Set Up MongoDB Atlas (Database)

### Step 1: Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Create a new project (e.g., "BugHive")
4. Click "Build a Cluster" → Select "M0 Free" tier
5. Choose region closest to you
6. Click "Create Cluster"

### Step 2: Create Database User

1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Set username: `bughive_user`
4. Set password: (generate a strong one, save it!)
5. Click "Create Database User"

### Step 3: Whitelist IP Address

1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (⚠️ for development; restrict in production)
4. Click "Confirm"

### Step 4: Get Connection String

1. Click "Connect" on your cluster
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. Replace `<username>` with `bughive_user`
5. Replace `<password>` with the password you created
6. Replace `myFirstDatabase` with `bughive`
7. Keep this saved for Render environment variables

**Example connection string:**
```
mongodb+srv://bughive_user:your_password@cluster.mongodb.net/bughive?retryWrites=true&w=majority
```

## Phase 2: Deploy Backend to Render

### Step 1: Create Render Account

1. Visit https://render.com
2. Click "Get Started"
3. Sign up with GitHub (authorize Render to access your repositories)

### Step 2: Create Web Service

1. Click "New+" button → "Web Service"
2. Select your `bughive-mern-bug-trackerhillary` repository
3. Authorize Render if prompted

### Step 3: Configure Web Service

Fill in the following configuration:

| Setting | Value | Notes |
|---------|-------|-------|
| **Name** | `bughive-backend` | Service identifier |
| **Environment** | `Node` | Runtime environment |
| **Region** | `Oregon` | ~Closest to your location~ |
| **Branch** | `main` | Or your working branch |
| **Build Command** | `npm install --prefix backend` | Installs backend dependencies |
| **Start Command** | `node backend/server.js` | Server entry point |
| **Restart Policy** | `On failure` | Auto-restart on crashes |

### Step 4: Add Environment Variables

Click "Environment" and add these variables:

| Key | Value | Notes |
|-----|-------|-------|
| `MONGO_URI` | `mongodb+srv://bughive_user:YOUR_PASSWORD@cluster.mongodb.net/bughive?retryWrites=true&w=majority` | MongoDB connection string (replace PASSWORD) |
| `JWT_SECRET` | Generate a strong random string | Use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NODE_ENV` | `production` | Production environment |
| `PORT` | `10000` | Render's default (optional) |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | Your Vercel frontend URL (for CORS) |

**How to generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy

1. Review all settings in "Create Web Service"
2. Click "Create Web Service"
3. Wait for build and deployment (~2-3 minutes)
4. Look for "✓ Live" status in green
5. Once live, copy your backend URL: `https://bughive-backend.onrender.com` (example)

## Phase 3: Connect Frontend to Backend

### Step 1: Get Backend URL

Once deployment is "Live":
1. Copy the URL from Render dashboard
2. Format: `https://bughive-backend-xxxxx.onrender.com`

### Step 2: Update Frontend Environment Variable

1. Go to Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://bughive-backend-xxxxx.onrender.com` (your Render URL)
4. Click "Save"

### Step 3: Redeploy Frontend

1. In Vercel, go to "Deployments"
2. Click "Redeploy" on the latest deployment
3. Wait for green "Ready" status
4. Frontend will now connect to your live backend! 🎉

## Testing Backend Deployment

### Check Health Endpoint

```bash
curl https://bughive-backend-xxxxx.onrender.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

### Test API Root

```bash
curl https://bughive-backend-xxxxx.onrender.com/
```

Expected response:
```json
{
  "message": "🐛 BugHive API is running",
  "version": "1.0.0",
  "status": "healthy"
}
```

## Troubleshooting

### Build Fails

1. Check "Build Logs" in Render dashboard
2. Common issues:
   - Missing `npm start` script in `package.json`
   - Missing dependencies in `package-lock.json`
   - Node version mismatch (Render typically uses recent LTS)

### MongoDB Connection Errors

1. Verify `MONGO_URI` is correct in environment variables
2. Check MongoDB Atlas IP whitelist includes Render (or "Allow from Anywhere")
3. Test connection string locally:
   ```bash
   cd backend
   node -e "require('mongoose').connect(process.env.MONGO_URI).then(() => console.log('✓ Connected')).catch(e => console.log('✗', e.message))"
   ```

### 401 Unauthorized Errors on Protected Routes

1. Verify `JWT_SECRET` is set in Render environment
2. Check frontend is sending Authorization header correctly
3. Tokens should be in format: `Authorization: Bearer <token>`

### CORS Issues (Frontend Can't Connect)

1. Verify `FRONTEND_URL` is set correctly in Render environment
2. Check Render logs for CORS error messages
3. Ensure Vercel frontend URL is exactly correct (https:// scheme, domain.vercel.app)

### Service Won't Stay "Live"

1. Check logs in Render dashboard
2. Look for crash messages
3. Common causes:
   - Missing environment variables
   - MongoDB connection timeout
   - Unhandled promise rejections

## Configuration Reference

### Backend Build Command
```
npm install --prefix backend
```
- Installs dependencies from `backend/package.json`

### Backend Start Command
```
node backend/server.js
```
- Directly starts the Express server
- Server listens on PORT (default 5000, Render provides 10000)

### Key Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | MongoDB connection | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Token signing key | 64-char hex string |
| `NODE_ENV` | Environment mode | `production` |
| `FRONTEND_URL` | CORS origin | `https://app.vercel.app` |

## Next Steps

After successful deployment:

1. **Test authentication**: Try login/register from frontend
2. **Create a bug**: Add a new bug and verify it's saved
3. **View bugs**: Retrieve bugs list and details
4. **Monitor logs**: Watch Render logs for any errors
5. **Set up monitoring**: (Optional) Configure Render alerts for failures

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Express Health Checks](https://expressjs.com/)
- [CORS Configuration](https://enable-cors.org/)

---

**Questions or issues?** Check the main [README.md](README.md) or review [QUICK_TROUBLESHOOTING.md](QUICK_TROUBLESHOOTING.md).
