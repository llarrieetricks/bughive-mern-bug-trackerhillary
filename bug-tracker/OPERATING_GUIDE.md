# 🔍 BugHive - Operating Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Browser                           │
│              Frontend (React + Vite)                        │
│              http://localhost:5173                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│            Backend (Express.js + Node.js)                   │
│              http://localhost:5000                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Routes:                                            │    │
│  │ • /api/auth (Register, Login, Get Current User)   │    │
│  │ • /api/bugs (CRUD operations for bugs)            │    │
│  │ • /api/bugs/:bugId/comments (Comments)            │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │ MongoDB Driver
                       │
┌──────────────────────▼──────────────────────────────────────┐
│           Database (MongoDB)                                │
│      mongodb://localhost:27017/bughive                     │
│  • Users Collection (name, email, password, role)          │
│  • Bugs Collection (title, description, priority, status) │
│  • Comments Collection (text, bugId, userId)              │
└─────────────────────────────────────────────────────────────┘
```

---

## User Flow

### 1️⃣ **Authentication Flow**

```
START
  ↓
User visits http://localhost:5173
  ↓
Is user logged in?
  ├─ NO → Show Home Page with "Get Started" button
  │        ↓
  │      Click "Get Started" → Register Page
  │        ↓
  │      Fill form (name, email, password)
  │        ↓
  │      Submit → POST /api/auth/register
  │        ↓
  │      Backend creates user + hashes password
  │        ↓
  │      Returns JWT token + user data
  │        ↓
  │      Frontend stores token in localStorage
  │        ↓
  │      Redirect to Dashboard
  │
  └─ YES → Show Dashboard (main app)
```

### 2️⃣ **Login Flow**

```
User on Home/Login Page
  ↓
Click "Sign In"
  ↓
Enter email & password
  ↓
Submit → POST /api/auth/login
  ↓
Backend validates credentials
  ├─ Invalid → Return error message
  └─ Valid → Return JWT token + user data
  ↓
Frontend stores token in localStorage
  ↓
Redirect to Dashboard
```

### 3️⃣ **Dashboard Flow**

```
Dashboard Page
  ↓
GET /api/bugs (fetch all bugs)
  ↓
Display bugs as grid/list with filters
  ↓
User can:
  ├─ View bug details
  ├─ Create new bug
  ├─ Edit bug
  ├─ Delete bug
  ├─ Add comments
  └─ Search/Filter bugs
```

---

## Component Breakdown

### **Frontend Structure**

```
/frontend/src/
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Register.jsx       # User registration
│   ├── Login.jsx          # User login
│   ├── Dashboard.jsx      # Main bug tracking interface
│   ├── CreateBug.jsx      # Create new bug
│   ├── BugDetails.jsx     # View/edit single bug + comments
│   └── NotFound.jsx       # 404 page
│
├── components/
│   ├── Navbar.jsx         # Navigation + theme toggle
│   ├── BugCard.jsx        # Individual bug card
│   └── ProtectedRoute.jsx # Route guard for auth
│
├── context/
│   ├── AuthContext.jsx    # Authentication state
│   └── ThemeContext.jsx   # Dark/Light mode state
│
└── services/
    └── api.js             # Axios HTTP client with interceptors
```

### **Backend Structure**

```
/backend/
├── server.js              # Express app setup
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # User schema
│   ├── Bug.js             # Bug schema
│   └── Comment.js         # Comment schema
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── bugController.js   # Bug CRUD logic
│   └── commentController.js
├── middleware/
│   └── auth.js            # JWT verification
└── routes/
    ├── authRoutes.js
    ├── bugRoutes.js
    └── commentRoutes.js
```

---

## Feature Operations

### **🔐 Authentication**

**Register:**
- User provides: name, email, password
- Backend hashes password with bcryptjs
- Creates user in MongoDB
- Returns JWT token (valid for 30 days)

**Login:**
- User provides: email, password
- Backend looks up user by email
- Compares hashed password
- Returns JWT token if valid

**Protected Routes:**
- Token stored in `localStorage`
- Sent in every request header: `Authorization: Bearer <token>`
- Backend validates token with `protect` middleware

---

### **🐛 Bug Management**

**Create Bug:**
```
POST /api/bugs
Headers: Authorization: Bearer <token>
Body: {
  title: "Login button not working",
  description: "...",
  priority: "high",
  status: "open"
}
```

**Get All Bugs:**
```
GET /api/bugs?priority=high&status=open
Returns array of bug objects
```

**Get Single Bug:**
```
GET /api/bugs/:bugId
Returns bug with all details + comments
```

**Update Bug:**
```
PUT /api/bugs/:bugId
Body: { title, description, priority, status }
```

**Delete Bug:**
```
DELETE /api/bugs/:bugId
```

---

### **💬 Comments**

**Add Comment:**
```
POST /api/bugs/:bugId/comments
Headers: Authorization: Bearer <token>
Body: { text: "Fixed in latest commit" }
```

**Get Bug Comments:**
```
GET /api/bugs/:bugId/comments
Returns array of comments for that bug
```

**Delete Comment:**
```
DELETE /api/comments/:commentId
```

---

### **🌓 Dark/Light Mode**

**How it works:**
1. User clicks sun/moon icon in navbar
2. `toggleTheme()` function called
3. `dark` class added/removed from `<html>` element
4. Preference saved to `localStorage` as 'theme'
5. On page reload, theme is restored from localStorage
6. Tailwind CSS applies `dark:*` classes

**Storage:**
- Key: `theme`
- Values: `'dark'` or `'light'`

---

## Data Flow Example: Creating a Bug

```
USER ACTION: Click "Report Bug" → fills form → submits

FRONTEND:
  1. Form validation (client-side)
  2. API call: POST /api/bugs
  3. Request includes Authorization header with JWT token
  4. Show loading spinner
  
BACKEND:
  1. Middleware checks JWT token validity
  2. Extract user ID from token
  3. Create bug document with user reference
  4. Save to MongoDB
  5. Return created bug object
  
FRONTEND:
  1. Receive response
  2. Add new bug to state
  3. Show success message
  4. Redirect to dashboard or bug details
  5. Display updated bug list
```

---

## Error Handling

### **Common Error Responses**

| Code | Meaning | Example |
|------|---------|---------|
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Invalid token or credentials |
| 409 | Conflict | Email already exists |
| 500 | Server Error | Database error |

### **Frontend Error Handling**
- Errors displayed in red alert boxes
- Messages shown to user
- Failed requests logged to console
- Invalid tokens redirect to login

---

## State Management

### **AuthContext**
```javascript
{
  user: { _id, name, email, role },
  token: "jwt_token_here",
  loading: boolean,
  isAuthenticated: boolean,
  login: (email, password) => Promise,
  register: (name, email, password) => Promise,
  logout: () => void
}
```

### **ThemeContext**
```javascript
{
  darkMode: boolean,
  toggleTheme: () => void,
  setDarkMode: (boolean) => void
}
```

---

## Typical User Journey

```
1. User arrives at http://localhost:5173
   ↓
2. Sees landing page (Home.jsx)
   ↓
3. Clicks "Get Started"
   ↓
4. Fills registration form
   ↓
5. Credentials sent to backend
   ↓
6. Account created, JWT token received
   ↓
7. Redirected to Dashboard.jsx
   ↓
8. Dashboard loads user's bugs from /api/bugs
   ↓
9. User can:
   - Click bug to see details
   - Create new bug
   - Add comments
   - Edit/delete bugs
   - Toggle dark mode
   ↓
10. Click logout to clear token and return to home
```

---

## Development Commands

```bash
# Start backend (from /backend)
node server.js

# Start frontend (from /frontend)
npm run dev

# Build frontend for production
npm run build

# Check for errors
npm run lint

# Test API endpoint
curl -X GET http://localhost:5000/
```

---

## Testing the System

### **Test Registration**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "password":"password123"
  }'
```

### **Test Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123"
  }'
```

---

## Production Deployment Checklist

- [ ] Update MongoDB URI to production database
- [ ] Set JWT_SECRET environment variable
- [ ] Enable CORS only for your domain
- [ ] Build frontend: `npm run build`
- [ ] Deploy backend to hosting (Render, Railway, etc.)
- [ ] Deploy frontend to hosting (Vercel, Netlify, etc.)
- [ ] Update API baseURL in frontend
- [ ] Test all features in production
- [ ] Set up monitoring/logging
- [ ] Create backup strategy for database

---

## Support & Troubleshooting

**Backend not running?**
- Check if MongoDB is running: `mongo --version`
- Ensure port 5000 is not in use
- Check `.env` file for correct settings

**Frontend not connecting to backend?**
- Check proxy in `vite.config.js`
- Ensure backend is running on port 5000
- Check browser console for CORS errors

**Dark mode not working?**
- Clear localStorage: `localStorage.clear()`
- Check if `dark` class is applied to `<html>`
- Verify Tailwind config has `darkMode: 'class'`

---

**Made with ❤️ by Hillary**
