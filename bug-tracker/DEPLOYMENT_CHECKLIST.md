# BugHive Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] All code committed to git (`git status` shows nothing)
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks
- [ ] All imports are used
- [ ] No TypeScript/ESLint errors
- [ ] `.env` files not committed
- [ ] `.env` files in `.gitignore`

### Testing
- [ ] Frontend builds successfully (`npm run build --prefix frontend`)
- [ ] Backend starts without errors (`node backend/server.js`)
- [ ] Login/Register flows work locally
- [ ] Bug CRUD operations work locally
- [ ] Dark mode toggle works
- [ ] Responsive design verified (mobile/tablet/desktop)
- [ ] No console errors in DevTools
- [ ] Network requests complete successfully

### Repository
- [ ] Repository pushed to GitHub
- [ ] Branch is up-to-date with main
- [ ] No merge conflicts
- [ ] `.gitignore` includes: `node_modules/`, `.env`, `dist/`, `build/`

---

## MongoDB Atlas Setup

- [ ] Account created at https://www.mongodb.com/cloud/atlas
- [ ] Organization created
- [ ] M0 (Free) cluster created
- [ ] Cluster provisioned and shows "Available"
- [ ] Database user created with username/password
- [ ] IP whitelist configured (temporarily 0.0.0.0/0)
- [ ] Connection string copied to secure location
- [ ] Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/bughive`
- [ ] Test connection: `mongosh "mongodb+srv://username:password@cluster..."`

---

## Backend Deployment (Render)

### Account & Setup
- [ ] Render.com account created
- [ ] GitHub connected to Render
- [ ] Repository authorized for Render access

### Web Service Configuration
- [ ] Web Service created from `bughive-mern-bug-trackerhillary` repo
- [ ] Service named `bughive-backend`
- [ ] Environment set to `Node`
- [ ] Region selected (closest to users or company)
- [ ] Build command: `npm install --prefix backend`
- [ ] Start command: `node backend/server.js`
- [ ] Auto-deploy on push: **enabled**

### Environment Variables
- [ ] `MONGODB_URI` set with Atlas connection string
- [ ] `JWT_SECRET` set (random 32+ character string)
- [ ] `NODE_ENV` set to `production`
- [ ] No sensitive data in code

### Deployment
- [ ] Service deployed successfully
- [ ] Status shows "Live" (green)
- [ ] Backend URL copied (e.g., `https://bughive-backend.onrender.com`)
- [ ] Test endpoint: Visit `/api/health` or similar

### Post-Deployment
- [ ] Logs show "Server running on port 5000"
- [ ] Logs show "MongoDB Connected"
- [ ] No error messages in logs
- [ ] Service auto-restarts on crash (verify in settings)

---

## Frontend Deployment (Vercel)

### Account & Setup
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Repository authorized for Vercel access

### Project Configuration
- [ ] Project imported from GitHub
- [ ] Project named `bughive-mern-bug-trackerhillary`
- [ ] Framework auto-detected as Vite
- [ ] Root directory set to `./`

### Build Settings
- [ ] Build command: `npm install --prefix frontend && npm run build --prefix frontend`
- [ ] Output directory: `frontend/dist`
- [ ] Install command: `npm install --legacy-peer-deps`
- [ ] Node.js version: 18+ (verify in settings)

### Environment Variables
- [ ] `VITE_API_URL` set to backend URL (e.g., `https://bughive-backend.onrender.com`)
- [ ] All variables consistent across environments

### Deployment
- [ ] Production deployment successful
- [ ] Status shows green checkmark
- [ ] Frontend URL generated (e.g., `https://bughive-mern-bug-trackerhillary.vercel.app`)
- [ ] Auto-redeploy on git push: **enabled**

### Post-Deployment
- [ ] Frontend loads without errors
- [ ] Page renders correctly
- [ ] No 404 errors for assets
- [ ] Network tab shows API calls to correct backend

---

## Integration Testing

### Functionality
- [ ] Frontend accessible at public URL
- [ ] Backend accessible at public URL
- [ ] Register page loads
- [ ] Can create new account
- [ ] Can login with created account
- [ ] JWT token received and stored
- [ ] Dashboard loads with authenticated user
- [ ] Can create new bug
- [ ] Can view bug list
- [ ] Can view bug details
- [ ] Can add comment to bug
- [ ] Can update bug status
- [ ] Can delete bug
- [ ] Search/filter functionality works

### UI/UX
- [ ] Dark mode toggle works
- [ ] Theme preference persists across page reloads
- [ ] Responsive on mobile (width < 768px)
- [ ] Responsive on tablet (768px - 1024px)
- [ ] Responsive on desktop (width > 1024px)
- [ ] No UI overlaps or misalignments
- [ ] All buttons clickable and responsive
- [ ] Forms validate correctly

### API Integration
- [ ] Open DevTools → Network tab
- [ ] API calls go to production backend URL
- [ ] HTTP status codes correct (200, 201, 400, 401, 404, 500)
- [ ] Response times reasonable (< 1 second)
- [ ] No CORS errors in console
- [ ] JWT token included in Authorization header
- [ ] Error responses display user-friendly messages

### Performance
- [ ] Frontend loads in < 3 seconds
- [ ] Page interactions responsive (< 100ms)
- [ ] No memory leaks (check DevTools Memory tab)
- [ ] Images optimized (not too large)
- [ ] CSS/JS minified and bundled

### Security
- [ ] HTTPS enabled on both frontend and backend
- [ ] JWT tokens not logged to console
- [ ] Passwords not visible in network requests
- [ ] No sensitive data in local storage (only JWT)
- [ ] CORS properly configured
- [ ] Backend validates all requests
- [ ] .env variables not exposed in frontend

---

## MongoDB Atlas Verification

- [ ] Cluster shows active connection(s)
- [ ] Data appears in Atlas UI (Collections tab)
- [ ] Users collection exists with registered users
- [ ] Bugs collection exists with created bugs
- [ ] Comments collection exists (if bugs have comments)
- [ ] Backups enabled (optional but recommended)

---

## Post-Deployment Tasks

### Monitoring
- [ ] Set up Render alerts for service restarts
- [ ] Set up Vercel alerts for deployment failures
- [ ] Enable MongoDB Atlas monitoring
- [ ] Check logs weekly for errors

### Security Hardening
- [ ] MongoDB IP whitelist updated to only Render server IP
  - Get Render server IP from: Dashboard → Settings → IP Whitelist
  - Remove 0.0.0.0/0 (allow everywhere)
- [ ] JWT_SECRET is strong and unique
- [ ] All sensitive data in environment variables only
- [ ] Enable Render monitoring/alerts

### Documentation
- [ ] Update this checklist as completed
- [ ] Document any issues encountered
- [ ] Add to GitHub wiki/documentation
- [ ] Share deployment guide with team (if applicable)

### Optional Enhancements
- [ ] Add custom domain (Vercel + Route 53/DNS provider)
- [ ] Set up email notifications
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Configure CDN caching headers
- [ ] Enable database backups

---

## Troubleshooting Reference

| Issue | Solution | Location |
|-------|----------|----------|
| Build fails on Vercel | Check build command in vercel.json | Vercel Settings |
| Backend connection fails | Verify MongoDB URI and IP whitelist | VERCEL_DEPLOYMENT_GUIDE.md |
| CORS errors | Update CORS config in backend/server.js | Backend code |
| Frontend won't load API | Check VITE_API_URL environment variable | Vercel Settings |
| MongoDB won't connect | Verify username/password and network access | MongoDB Atlas |
| 502 errors from backend | Check Render logs and restart service | Render Dashboard |
| Theme doesn't persist | Check localStorage permissions | Browser DevTools |

**Full troubleshooting guide**: [VSCODE_TROUBLESHOOTING.md](VSCODE_TROUBLESHOOTING.md)

---

## Final Verification

Before marking as complete, verify:

```bash
# Check deployment URLs are accessible
curl -I https://bughive-backend.onrender.com
curl -I https://bughive-mern-bug-trackerhillary.vercel.app

# Test API endpoint
curl https://bughive-backend.onrender.com/api/health

# Verify git is clean
git status  # Should show "nothing to commit"
```

---

## Sign-Off

- **Deployed by**: ________________
- **Date**: ________________
- **Verified**: ☐ Yes ☐ No
- **Issues found**: ________________
- **Notes**: ________________

**Deployment Complete! 🚀**
