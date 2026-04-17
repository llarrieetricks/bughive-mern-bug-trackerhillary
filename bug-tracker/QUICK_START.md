# BugHive - Quick Start Guide

## 🎯 Overview

BugHive is a **fully separated MERN stack** application:
- **Backend**: Independent Node.js/Express API server
- **Frontend**: Independent React/Vite web application

Both can be developed, tested, and deployed **completely independently**.

## 📦 Quick Setup (5 minutes)

### Option A: Automated Setup

```bash
# From project root
chmod +x setup.sh
./setup.sh
```

### Option B: Manual Setup

#### 1. Install Backend

```bash
cd backend
npm install
```

#### 2. Install Frontend

```bash
cd frontend
npm install
```

#### 3. Configure Environment

**Backend** (`backend/.env`):
```
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/bughive
JWT_SECRET=dev_secret_key_change_in_production
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5001
```

## 🚀 Run Locally

### Terminal 1: Start Backend

```bash
cd backend
npm run dev
```

✅ Backend running on `http://localhost:5001`

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
```

✅ Frontend running on `http://localhost:5173`

### Access the Application

- **Web App**: `http://localhost:5173`
- **API**: `http://localhost:5001`
- **API Docs**: `http://localhost:5001/api/docs`
- **Health Check**: `http://localhost:5001/api/health`

## 📁 Architecture

```
┌─────────────────────────────────────┐
│     Frontend (React/Vite)           │
│     http://localhost:5173           │
│  ├─ Components                      │
│  ├─ Pages (auth, bugs, etc.)       │
│  ├─ Services (API client)          │
│  └─ Styling (Tailwind CSS)         │
└────────────┬────────────────────────┘
             │
      HTTP/HTTPS Requests (Axios)
             │
┌────────────▼────────────────────────┐
│     Backend (Express/Node)          │
│     http://localhost:5001           │
│  ├─ Auth API                        │
│  ├─ Bug Management API              │
│  ├─ Comments API                    │
│  └─ Database (MongoDB)              │
└─────────────────────────────────────┘
```

## 🔑 Key Features

### Backend API

- ✅ User registration & login (JWT authentication)
- ✅ Bug CRUD operations
- ✅ Comments on bugs
- ✅ CORS-protected endpoints
- ✅ API documentation (Swagger UI)
- ✅ Health check endpoint

### Frontend App

- ✅ Responsive React UI
- ✅ User authentication
- ✅ Bug dashboard with search/filter
- ✅ Create and manage bugs
- ✅ Comments on bugs
- ✅ Light/Dark theme
- ✅ Protected routes

## 📚 Documentation

| File | Purpose |
|------|---------|
| [SEPARATION_GUIDE.md](./SEPARATION_GUIDE.md) | Architecture & separation details |
| [backend/README.md](./backend/README.md) | Backend setup, API, deployment |
| [frontend/README.md](./frontend/README.md) | Frontend setup, build, deployment |
| [API_GUIDE.md](./API_GUIDE.md) | Detailed API endpoint reference |
| [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md) | Deploy backend to Render.com |
| [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) | Deploy frontend to Vercel |
| [DEPLOYMENT_CHECKLIST_SEPARATION.md](./DEPLOYMENT_CHECKLIST_SEPARATION.md) | Pre-deployment verification |

## 🚀 Deploy to Production

### Backend

Deploy to Render.com, Heroku, Railway, or similar:

1. See [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)
2. Set environment variables (MONGO_URI, JWT_SECRET, etc.)
3. Deploy: `git push`

### Frontend

Deploy to Vercel, Netlify, GitHub Pages, or similar:

1. See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
2. Set `VITE_API_URL` to production backend
3. Deploy: `git push`

## 🔒 Security Checklist

Before pushing to git, verify:

- [ ] `.env` files are in `.gitignore`
- [ ] No secrets in code (only in environment variables)
- [ ] `JWT_SECRET` is strong (production)
- [ ] `MONGO_URI` uses secure connection
- [ ] CORS properly configured (production)
- [ ] API keys not exposed in frontend code

## 🐛 Troubleshooting

### Backend not starting?

```bash
# Check Node.js version
node --version  # Should be 14+

# Verify environment variables
cat backend/.env

# Check MongoDB connection
# Use MongoDB Compass or atlas.mongodb.com

# Clear and reinstall
rm -rf backend/node_modules
npm install --prefix backend
```

### Frontend not connecting to backend?

```bash
# Check .env has correct VITE_API_URL
cat frontend/.env

# Check backend is running on that port
curl http://localhost:5001/api/health

# Check browser console for CORS errors
# Must match backend FRONTEND_URL environment variable

# Restart development server
# Kill and restart: npm run dev --prefix frontend
```

### Port already in use?

```bash
# Change port in .env
# Backend: PORT=5002
# Frontend: Reconfigure in vite.config.js

# Or kill existing process
# Linux/Mac: lsof -i :5001 | grep -v COMMAND | awk '{print $2}' | xargs kill -9
# Windows: netstat -ano | findstr :5001
```

## 📧 Need Help?

1. Check relevant README in backend/ or frontend/
2. Review QUICK_TROUBLESHOOTING.md
3. Check API_GUIDE.md for endpoint issues
4. Review error messages carefully - they usually indicate the problem

## ✨ Next Steps

1. ✅ Local development: Run both services locally
2. 📚 Learn the API: Check API_GUIDE.md or swagger at `/api/docs`
3. 🎨 Explore UI: Browse the frontend components
4. 🚀 Deploy backend first, then frontend
5. 🧪 Test in production

---

**Happy bug tracking! 🐛**

For detailed developer guides, see:
- Backend development: [backend/README.md](./backend/README.md)
- Frontend development: [frontend/README.md](./frontend/README.md)
