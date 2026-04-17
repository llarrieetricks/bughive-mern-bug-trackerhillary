# 🐛 BugHive Backend - Node.js/Express API

## Overview

BugHive Backend is a RESTful API built with **Express.js** and **MongoDB** that provides:

- User authentication with JWT
- Bug tracking (CRUD operations)
- Comments on bugs
- CORS-protected endpoints
- Swagger API documentation
- Health check endpoint for monitoring

## 🛠️ Tech Stack

- **Runtime**: Node.js 14+
- **Framework**: Express.js 5.x
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware
- **Documentation**: Swagger UI Express
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js 14+ and npm/yarn
- MongoDB (local or cloud instance)
- Git

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file from template:

```bash
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/bughive
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_123456
FRONTEND_URL=http://localhost:5173
```

**Environment Variables Explained**:

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Application mode | `development` or `production` |
| `PORT` | Server port | `5001` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/bughive` |
| `JWT_SECRET` | Secret key for JWT signing | Must be long and random |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:5173` or production URL |

### 3. Start Development Server

```bash
npm run dev
```

Server starts on `http://localhost:5001`

### 4. Verify API is Running

- **Health Check**: `GET http://localhost:5001/api/health`
- **API Docs**: `GET http://localhost:5001/api/docs` (Swagger UI)
- **Root Endpoint**: `GET http://localhost:5001/` (JSON message)

## 📂 Project Structure

```
backend/
├── config/
│   ├── db.js           # MongoDB connection
│   └── swagger.js      # Swagger documentation setup
├── controllers/
│   ├── authController.js      # User registration & login
│   ├── bugController.js       # Bug CRUD operations
│   └── commentController.js   # Comment CRUD operations
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── models/
│   ├── User.js         # User schema
│   ├── Bug.js          # Bug schema
│   └── Comment.js      # Comment schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── bugRoutes.js          # Bug endpoints
│   └── commentRoutes.js      # Comment endpoints
├── server.js           # Application entry point
├── package.json        # Dependencies & scripts
└── .env                # Environment variables (⚠️ never commit)
```

## 🔌 API Endpoints

### Authentication Routes

```
POST   /api/auth/register       Register a new user
POST   /api/auth/login          Login and get JWT token
GET    /api/auth/me             Get current user (requires token)
```

### Bug Routes

```
GET    /api/bugs                Get all bugs (with filters)
GET    /api/bugs/:id            Get specific bug
POST   /api/bugs                Create new bug (requires token)
PUT    /api/bugs/:id            Update bug (requires token)
DELETE /api/bugs/:id            Delete bug (requires token)
```

### Comment Routes

```
GET    /api/bugs/:bugId/comments           Get bug comments
POST   /api/bugs/:bugId/comments           Add comment (requires token)
DELETE /api/comments/:id                   Delete comment (requires token)
```

### System Routes

```
GET    /                         API status
GET    /api/health              Health check (for monitoring)
GET    /api/docs                Swagger API documentation
```

## 🔐 Authentication

### JWT Token Flow

1. User registers or logs in
2. Server returns JWT token
3. Client stores token (usually in localStorage)
4. Client sends token in `Authorization: Bearer <token>` header
5. Server validates token on protected routes

### Protected Routes

Routes marked with `(requires token)` above need JWT authentication.

### Token Expiration

Configure token expiration in `authController.js`. Default: 24 hours

## 🗄️ Database

### MongoDB Connection

Backend connects to MongoDB using `MONGO_URI` environment variable.

**Local MongoDB**:
```
mongodb://localhost:27017/bughive
```

**MongoDB Atlas (Cloud)**:
```
mongodb+srv://username:password@cluster.mongodb.net/bughive?retryWrites=true&w=majority
```

### Models

- **User**: username, email, password (hashed), createdAt
- **Bug**: title, description, assignee, status, priority, etc., createdBy, createdAt
- **Comment**: text, bugId, userId, createdAt

## 📦 Scripts

```bash
npm run dev       # Start with file watcher (development)
npm run start     # Start server (production)
npm test          # Run tests (not yet implemented)
```

## 🚢 Production Deployment

### Environment Variables for Production

```bash
NODE_ENV=production
PORT=10000                    # Render uses this port
MONGO_URI=<production-mongo-uri>
JWT_SECRET=<strong-secret>
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms

#### [Render.com](https://render.com) (Recommended)

See [RENDER_DEPLOYMENT_GUIDE.md](../RENDER_DEPLOYMENT_GUIDE.md)

```bash
git push origin main  # Trigger auto-deployment
```

#### [Heroku](https://heroku.com)

```bash
heroku login
heroku create bughive-backend
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-jwt-secret>
git push heroku main
```

#### [Railway.app](https://railway.app)

1. Connect GitHub repo
2. Set environment variables in dashboard
3. Deploy

## 🔍 Monitoring & Health Checks

The `/api/health` endpoint returns:

```json
{
  "status": "healthy",
  "timestamp": "2024-04-17T10:30:00.000Z",
  "environment": "production"
}
```

Use this endpoint for:
- Health checks in load balancers
- Uptime monitoring services
- Deployment verification

## 🐛 Debugging

### Enable Debug Logging

Add to server.js:
```javascript
if (process.env.DEBUG) {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}
```

Then run:
```bash
DEBUG=1 npm run dev
```

### Common Issues

**MONGO_URI connection failed**
- Check MongoDB is running
- Verify connection string format
- Check firewall/network access

**JWT_SECRET not set**
- Ensure `.env` file exists
- Verify `JWT_SECRET` is defined
- Server will exit with error message

**CORS errors**
- Add frontend URL to `FRONTEND_URL` environment variable
- Check frontend is making requests to correct API URL

## 📚 Related Files

- [API Guide](../API_GUIDE.md) - Detailed endpoint documentation
- [Separation Guide](../SEPARATION_GUIDE.md) - Backend/Frontend separation overview
- [Render Deployment](../RENDER_DEPLOYMENT_GUIDE.md) - Production deployment steps
- [Troubleshooting](../QUICK_TROUBLESHOOTING.md) - Common issues & solutions

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [CORS Guide](https://enable-cors.org/)

---

**Port**: 5001 (development) | 10000 (Render production)
**Version**: 1.0.0
