# Backend & Frontend Deployment Checklist

This checklist ensures your backend and frontend are properly separated and configured for independent deployment.

## 📋 Pre-Deployment Verification

### Separation & Structure

- [ ] Backend and frontend are in separate directories
  - Backend: `./backend/`
  - Frontend: `./frontend/`
- [ ] Each service has its own `package.json`
- [ ] Each service has its own `node_modules` (don't share)
- [ ] Each service has its own `.env` file (never commit)
- [ ] Root `.env.template` exists with both backend and frontend variables

### Configuration Files

- [ ] `backend/.env` configured with:
  - `NODE_ENV=development` (or `production`)
  - `PORT=5001` (or 10000 for Render)
  - `MONGO_URI=mongodb://...`
  - `JWT_SECRET=<strong-secret>`
  - `FRONTEND_URL=http://localhost:5173` (or production URL)

- [ ] `frontend/.env` configured with:
  - `VITE_API_URL=http://localhost:5001` (or production backend URL)

- [ ] `render.yaml` configured correctly (if deploying to Render):
  - `buildCommand: cd backend && npm install`
  - `startCommand: cd backend && npm run start`

- [ ] `vercel.json` configured correctly (if deploying to Vercel):
  - `buildCommand: npm run build --prefix frontend`
  - `outputDirectory: frontend/dist`

### .gitignore Configuration

- [ ] Root `.gitignore` ignores:
  - `node_modules/`
  - `dist/`
  - `.env`
  - `.env.local`
  - `.vscode/` (optional)

- [ ] Backend `.gitignore` exists with Node.js patterns
- [ ] Frontend `.gitignore` exists with Node.js patterns

## 🔍 Code Verification

### Backend Configuration

- [ ] `backend/server.js`:
  - Uses `process.env.PORT` for port
  - Uses `process.env.MONGO_URI` for database
  - Uses `process.env.JWT_SECRET` for authentication
  - Uses `process.env.FRONTEND_URL` for CORS
  - Validates required environment variables on startup

- [ ] CORS configuration in `backend/server.js`:
  - Allows frontend origin (localhost or production)
  - Allows credentials for cookie-based sessions

- [ ] Database connection (`backend/config/db.js`):
  - Connects using `MONGO_URI` environment variable
  - Handles connection errors gracefully

- [ ] Authentication routes (`backend/routes/authRoutes.js`):
  - Provide register and login endpoints
  - Return JWT tokens for authenticated users

### Frontend Configuration

- [ ] `frontend/vite.config.js`:
  - Proxy is configured for development (optional)
  - No hardcoded backend URLs

- [ ] `frontend/src/services/api.js`:
  - Uses `VITE_API_URL` environment variable for base URL
  - Automatically injects JWT token in request headers
  - Handles authentication errors

- [ ] Frontend routes (`frontend/src/App.jsx`):
  - ProtectedRoute component restricts access to authenticated users
  - Login/Register pages are public
  - Dashboard requires authentication

- [ ] Context providers (`frontend/src/context/`):
  - AuthContext handles user state and login
  - No backend logic in frontend (except API calls)

### Environment Variable Security

- [ ] `.env` files are listed in `.gitignore`:
  - No `.env` file should be committed
  - Only `.env.example` or `.env.template` in repo

- [ ] No hardcoded credentials in code:
  - No MongoDB connection strings in code
  - No JWT secrets in code
  - No API keys in code

- [ ] Environment variables used correctly:
  - Backend uses `process.env.*`
  - Frontend uses `import.meta.env.VITE_*`

## 🚀 Deployment Checklist

### Backend Deployment (Render, Heroku, etc.)

- [ ] Render.com:
  - Repository connected to Render
  - Environment variables set in Render dashboard
  - MONGO_URI points to production database
  - JWT_SECRET is strong and secure
  - FRONTEND_URL set to production frontend domain

- [ ] Or Heroku:
  - App created: `heroku create app-name`
  - Buildpack set to Node.js
  - Environment variables configured
  - Procfile not needed (uses package.json scripts)

### Frontend Deployment (Vercel, Netlify, etc.)

- [ ] Vercel:
  - Repository connected to Vercel
  - VITE_API_URL set to production backend URL
  - Build command: `npm run build --prefix frontend`
  - Output directory: `frontend/dist`
  - Rewrite rules configured for SPA routing

- [ ] Or Netlify:
  - Repository connected to Netlify
  - Build command: `npm run build --prefix frontend`
  - Publish directory: `frontend/dist`
  - Environment variables configured
  - Redirect rules configured for SPA

### Database

- [ ] MongoDB:
  - Database created and accessible
  - Connection string (MONGO_URI) working
  - Database user credentials set
  - Network access properly configured (if cloud)

- [ ] Collections:
  - Users, Bugs, Comments collections exist
  - Indexes created if needed
  - Data properly backed up

## 🧪 Testing Before Push

### Local Testing

- [ ] Backend starts without errors:
  ```bash
  cd backend
  npm install
  npm run dev
  ```

- [ ] Frontend starts without errors:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

- [ ] API endpoints respond:
  - `GET http://localhost:5001/` → returns API message
  - `GET http://localhost:5001/api/health` → returns health status
  - `GET http://localhost:5001/api/docs` → shows Swagger UI

- [ ] Frontend development server runs:
  - `GET http://localhost:5173` → loads React app
  - No CORS errors in browser console
  - No missing environment variable warnings

- [ ] Authentication flow works:
  - Can register a new user
  - Can login with credentials
  - JWT token stored in localStorage
  - Can access protected pages when logged in
  - Redirected to login when token is invalid

- [ ] Bug tracking works:
  - Can create a bug
  - Can view bug list
  - Can view bug details
  - Can add comments to bugs
  - Can delete bugs (as creator)

### Build Testing

- [ ] Frontend production build:
  ```bash
  cd frontend
  npm run build
  ```
  - No build errors
  - `dist/` folder created
  - Can preview with `npm run preview`

## 📝 Git Hygiene

- [ ] Before pushing, verify with:
  ```bash
  git status        # No .env files listed
  git diff          # Review all changes
  ```

- [ ] .gitignore is working:
  - `git check-ignore .env` returns the file
  - `git check-ignore backend/.env` returns the file
  - `git check-ignore node_modules` returns paths

- [ ] Commit message is descriptive:
  ```bash
  git commit -m "Chore: Separate backend/frontend with dedicated configs"
  ```

- [ ] No secrets in commit history:
  ```bash
  git log -p | grep -i "secret\|password\|key"  # Should return nothing
  ```

## ✅ Final Checks

- [ ] README.md explains the separation
  - How to run backend locally
  - How to run frontend locally
  - How to deploy each separately

- [ ] SEPARATION_GUIDE.md exists and is comprehensive
- [ ] backend/README.md provides deployment instructions
- [ ] frontend/README.md provides deployment instructions
- [ ] RENDER_DEPLOYMENT_GUIDE.md updated for separated structure
- [ ] VERCEL_DEPLOYMENT_GUIDE.md updated for separated structure

- [ ] Team members understand:
  - How to run locally (both services)
  - How to configure environment variables
  - How to deploy each service independently
  - Where to find relevant documentation

## 🎉 Ready for Deployment!

Once all checkboxes are checked:

1. Push to main branch (or feature branch for review)
2. Create pull request with summary of changes
3. Deploy backend to production platform
4. Deploy frontend to production platform
5. Verify both are working together in production

---

**Last Updated**: April 17, 2026
**Version**: 1.0
