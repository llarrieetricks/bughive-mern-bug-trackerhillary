# 🐛 BugHive Frontend - React Vite Application

## Overview

BugHive Frontend is a modern web application built with **React 18** and **Vite** that provides:

- User authentication (register/login)
- Dashboard with bug listing
- Bug creation and detailed views
- Real-time comments on bugs
- Responsive design with Tailwind CSS
- Automatic token management
- Light/Dark theme support

## 🛠️ Tech Stack

- **UI Framework**: React 18.x
- **Build Tool**: Vite 5.x
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 3.x
- **HTTP Client**: Axios
- **State Management**: React Context API
- **CSS Processing**: PostCSS
- **Code Quality**: Prettier, EditorConfig

## 📋 Prerequisites

- Node.js 14+ and npm/yarn
- Git
- Modern web browser

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env` file:

```bash
VITE_API_URL=http://localhost:5001
```

**Environment Variables Explained**:

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5001` (dev) or `https://your-api.com` (prod) |

### 3. Start Development Server

```bash
npm run dev
```

Application opens at `http://localhost:5173`

### 4. Features Available Locally

- ✅ View home page
- ✅ Register & login (if backend is running)
- ✅ CRUD operations on bugs (if backend is running)
- ✅ Add comments to bugs
- ✅ Theme switching

## 📂 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── BugCard.jsx         # Bug list item component
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication state (login, user info)
│   │   └── ThemeContext.jsx    # Theme state (light/dark mode)
│   ├── pages/
│   │   ├── BugDetails.jsx      # Individual bug view with comments
│   │   ├── CreateBug.jsx       # Form to create new bug
│   │   ├── Dashboard.jsx       # Bug listing page (dashboard)
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login form
│   │   ├── NotFound.jsx        # 404 page
│   │   └── Register.jsx        # Registration form
│   ├── services/
│   │   └── api.js          # Axios API client with interceptors
│   ├── App.jsx             # Main App component with routing
│   ├── index.css           # Global styles & Tailwind
│   └── main.jsx            # React entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies & scripts
├── .env                    # Environment variables (⚠️ never commit)
└── index.html              # HTML entry point
```

## 🎨 Key Components

### Authentication System

**AuthContext** manages:
- User registration & login
- JWT token storage
- Current user info
- Logout functionality

**ProtectedRoute** component:
- Restricts access to authenticated users
- Redirects to login if not authenticated

### API Service

**api.js** provides:
- Axios HTTP client instance
- Base URL configuration from `VITE_API_URL`
- JWT token injection in request headers
- API methods: register, login, CRUD operations
- Error handling

### Theme System

**ThemeContext** provides:
- Light/Dark mode switching
- Theme persistence in localStorage

## 🔌 API Integration

### Backend URL Configuration

The frontend reads backend URL from `VITE_API_URL`:

```javascript
// In services/api.js
const apiBaseUrl = import.meta.env.VITE_API_URL
```

### Development vs Production

**Development** (`.env`):
```
VITE_API_URL=http://localhost:5001
```

**Production** (Set in hosting platform):
```
VITE_API_URL=https://your-backend-api.com
```

### Authentication Flow

1. User submits login/register form
2. Frontend sends credentials to backend `/api/auth/login` or `/api/auth/register`
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Token automatically added to all API requests
6. Protected routes check for valid token

## 🏗️ Page Routes

```
/                 Home page (public)
/login            Login page (public)
/register         Registration page (public)
/dashboard        Bug list (protected)
/bugs/:id         Bug details (protected)
/create-bug       Create bug form (protected)
*                 Not found page
```

## 📦 Scripts

```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # Build for production (creates dist/)
npm run preview   # Preview production build locally
```

## 🚢 Production Build

### Build for Production

```bash
npm run build
```

Creates optimized files in `dist/` folder.

### Build Output

```
dist/
├── index.html                  # HTML entry point
├── assets/
│   ├── index-[hash].js         # Main bundle
│   ├── [name]-[hash].js        # Chunk files
│   └── index-[hash].css        # Styles
└── .vite/manifest.json         # Build manifest
```

### Environment Variables for Production

Set in your hosting platform (Vercel, Netlify, etc.):

```
VITE_API_URL=https://your-production-backend.com
```

## 🚀 Deployment

### [Vercel](https://vercel.com) (Recommended)

See [VERCEL_DEPLOYMENT_GUIDE.md](../VERCEL_DEPLOYMENT_GUIDE.md)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

**Production Build**:
```bash
npm run build      # Runs automatically on Vercel
```

### [Netlify](https://netlify.com)

1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variable: `VITE_API_URL`

### [GitHub Pages](https://pages.github.com)

Update `vite.config.js`:
```javascript
export default {
  base: '/repository-name/',  // if not root
  // ...
}
```

Then build and deploy to `gh-pages` branch.

## 🔒 Security Considerations

### Token Management

- JWT token stored in localStorage
- Token automatically sent with API requests
- Token cleared on logout
- Consider `httpOnly` cookies for additional security in future

### Environment Variables

- `VITE_API_URL` is exposed to client (it's public)
- Never put secrets in `.env` files
- Sensitive operations handled by backend

### CORS

- Backend controls which origins can access API
- Frontend must use correct backend URL
- Check browser console for CORS errors

## 🐛 Debugging

### Debug Mode

Check backend connection status:

```javascript
// In browser console
import { isBackendConfigured } from './services/api'
console.log(isBackendConfigured)  // true if backend is configured
```

### Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Check API requests:
   - URL should be correct
   - Headers should include `Authorization: Bearer <token>`
   - Response codes: 200 (success), 401 (unauthorized), 404 (not found)

### Common Issues

**Backend not configured**
- Ensure `.env` file exists with `VITE_API_URL`
- Must restart dev server after changing `.env`
- Check `VITE_API_URL` matches backend URL

**CORS errors**
- Verify backend is running
- Check backend `FRONTEND_URL` environment variable
- Try `http://localhost:5001` for local development

**Token issues**
- Check localStorage for `token` key
- Verify token is being sent in Authorization header
- Login again if token is invalid

**Build errors**
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check for TypeScript errors (if applicable)

## 📚 Related Files

- [Separation Guide](../SEPARATION_GUIDE.md) - Backend/Frontend architecture
- [API Guide](../API_GUIDE.md) - Endpoint documentation
- [Vercel Deployment](../VERCEL_DEPLOYMENT_GUIDE.md) - Production deployment
- [Troubleshooting](../QUICK_TROUBLESHOOTING.md) - Common issues

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)

---

**Dev Port**: 5173
**Build Tool**: Vite
**Version**: 0.1.0
