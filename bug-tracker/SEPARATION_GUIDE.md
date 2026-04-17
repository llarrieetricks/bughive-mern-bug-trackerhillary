# Backend & Frontend Separation Guide

## 📁 Project Structure

```
bug-tracker/
├── backend/                    # Node.js/Express API Server
│   ├── config/                # Database & Swagger config
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth & CORS middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoints
│   ├── server.js              # Entry point
│   ├── package.json           # Backend dependencies
│   └── .env                   # Backend environment variables
│
├── frontend/                   # React/Vite Web Application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/           # Context providers (Auth, Theme)
│   │   ├── pages/             # Page components
│   │   ├── services/          # API client
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── .env                   # Frontend environment variables
│
├── .env.template              # Template for all environment variables
├── render.yaml                # Render.com backend deployment config
├── vercel.json                # Vercel frontend deployment config
└── README.md                  # Project documentation
```

## 🚀 Independent Deployment

### Backend (Node.js/Express)

**Location**: `backend/`

**Technology Stack**:
- Express.js 5.x
- Node.js 14+
- MongoDB
- JWT Authentication

**Environment Variables** (`backend/.env`):
```
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/bughive
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_123456
FRONTEND_URL=http://localhost:5173  # For CORS in production
```

**Local Development**:
```bash
cd backend
npm install
npm run dev          # Start with watch mode (nodemon)
```

**Production**:
```bash
npm run start        # Run server.js
```

**API Base URL**: `http://localhost:5001` (development) or `https://your-backend.com` (production)

**Hosted Platforms**:
- [Render](https://render.com) - See RENDER_DEPLOYMENT_GUIDE.md
- [Heroku](https://heroku.com)
- [Railway](https://railway.app)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/)

### Frontend (React/Vite)

**Location**: `frontend/`

**Technology Stack**:
- React 18.x
- Vite 5.x
- React Router v6
- Tailwind CSS 3.x
- Axios

**Environment Variables** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5001  # Backend API URL
```

**Local Development**:
```bash
cd frontend
npm install
npm run dev          # Start Vite dev server on http://localhost:5173
```

**Build for Production**:
```bash
npm run build        # Creates optimized build in dist/
npm run preview      # Preview production build locally
```

**Hosted Platforms**:
- [Vercel](https://vercel.com) - See VERCEL_DEPLOYMENT_GUIDE.md
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## 🔄 Communication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│              http://localhost:5173                          │
│  - Components, Pages, Routing                              │
│  - State Management (Context API)                          │
│  - Styling (Tailwind CSS)                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
        HTTP/HTTPS Requests (Axios)
                     │
                     ▼
         ┌───────────────────────────┐
         │     CORS Middleware       │
         │                           │
         │  (Validates Origins)      │
         └───────────┬───────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    BACKEND (Express)                        │
│              http://localhost:5001                          │
│  - REST API Endpoints                                      │
│  - Authentication (JWT)                                    │
│  - Business Logic                                          │
│  - Database Operations                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────▼────────┐
         │   MongoDB Database │
         │   (Data Storage)   │
         └────────────────────┘
```

## ⚙️ Configuration Separation

### Backend Configuration

Backend listens on `PORT` (default: 5001) and connects to MongoDB via `MONGO_URI`.

**In Production**:
- Backend knows the frontend URL via `FRONTEND_URL` (for CORS)
- Receives requests from the frontend at `https://your-backend.com`

### Frontend Configuration

Frontend sends requests to `VITE_API_URL`.

**In Production**:
- `VITE_API_URL=https://your-backend.com`
- Frontend is hosted separately from backend
- Built as a static site (SPA)

## 🔒 Security

1. **CORS**: Backend restricts requests to allowed origins
2. **JWT**: Backend requires valid JWT token for protected routes
3. **Environment Variables**: 
   - Never commit `.env` files to git
   - Use `.env.template` & `.env.example` for reference
   - Set secrets in hosting platform's environment settings

4. **API Keys**: Store only in environment variables, never in code

## 📝 .gitignore Configuration

Both services have their own `node_modules` to ignore:

```
# Backend & Frontend
node_modules/
dist/
build/
.env           # Never commit actual environment files
.env.local
.env.*.local
```

## ✅ Verification Checklist

Before deploying, verify:

- [ ] Backend `.env` has `MONGO_URI` pointing to production database
- [ ] Backend `.env` has `FRONTEND_URL` set to production frontend domain
- [ ] Frontend `.env` has `VITE_API_URL` pointing to production backend
- [ ] Both services run independently on different ports/domains
- [ ] CORS configuration allows frontend origin
- [ ] No hardcoded URLs or credentials in code
- [ ] Environment variables are set in hosting platform

## 📚 Related Guides

- [Backend Deployment (Render)](./RENDER_DEPLOYMENT_GUIDE.md)
- [Frontend Deployment (Vercel)](./VERCEL_DEPLOYMENT_GUIDE.md)
- [API Guide](./API_GUIDE.md)
- [Troubleshooting](./QUICK_TROUBLESHOOTING.md)
