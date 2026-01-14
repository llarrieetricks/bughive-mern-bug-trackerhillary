# 🌐 How APIs Work - Complete Guide

## What is an API?

**API = Application Programming Interface**

Think of an API like a **restaurant menu**:
- You (Client) can't enter the kitchen (Server)
- You read the menu (API documentation) 
- You order food (API request)
- Waiter takes order to kitchen (HTTP request)
- Food comes back (API response)
- You eat the food (use the data)

---

## HTTP Methods (The Order Types)

### **GET** - Retrieve Data (Read)
```
Like saying: "Give me the list of all bugs"

Example:
GET http://localhost:5000/api/bugs
Response: [{ id: 1, title: "Login bug", ... }, { id: 2, ... }]

In your app:
const bugs = await api.get('/api/bugs')
```

### **POST** - Create New Data (Write)
```
Like saying: "Add this new bug to the system"

Example:
POST http://localhost:5000/api/bugs
Body: { title: "Search not working", priority: "high" }
Response: { id: 123, title: "Search not working", ... }

In your app:
const newBug = await api.post('/api/bugs', {
  title: "Search not working",
  priority: "high"
})
```

### **PUT** - Update Existing Data (Modify)
```
Like saying: "Change this bug's status to closed"

Example:
PUT http://localhost:5000/api/bugs/123
Body: { status: "closed" }
Response: { id: 123, title: "...", status: "closed" }

In your app:
const updated = await api.put('/api/bugs/123', { status: "closed" })
```

### **DELETE** - Remove Data (Destroy)
```
Like saying: "Delete this bug"

Example:
DELETE http://localhost:5000/api/bugs/123
Response: { message: "Bug deleted successfully" }

In your app:
await api.delete('/api/bugs/123')
```

---

## Request/Response Cycle

```
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (Client)                                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ User clicks "Create Bug" button                         │ │
│ │         ↓                                               │ │
│ │ Form data: {title: "...", description: "..."}          │ │
│ │         ↓                                               │ │
│ │ JavaScript calls: api.post('/api/bugs', formData)       │ │
│ └──────────────────────┬──────────────────────────────────┘ │
└─────────────────────────┼─────────────────────────────────────┘
                          │ 
              HTTP REQUEST SENT (with headers & body)
                          │
┌─────────────────────────▼─────────────────────────────────────┐
│ BACKEND (Server - Express.js)                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 1. Request arrives at POST /api/bugs                    │ │
│ │ 2. Middleware checks JWT token (Authorization header)   │ │
│ │ 3. Route handler (bugController) receives request       │ │
│ │ 4. Validate data                                        │ │
│ │ 5. Create new bug in MongoDB                            │ │
│ │ 6. Get back the created bug object                      │ │
│ │ 7. Convert to JSON response                             │ │
│ │ 8. Send back to frontend                                │ │
│ └──────────────────────┬──────────────────────────────────┘ │
└─────────────────────────┼─────────────────────────────────────┘
                          │
              HTTP RESPONSE SENT (status code + body)
                          │
┌─────────────────────────▼─────────────────────────────────────┐
│ FRONTEND (Client)                                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 1. Response arrives (status 201 Created)                │ │
│ │ 2. Parse JSON: {id: 123, title: "...", ...}             │ │
│ │ 3. Add to bugs list in state                            │ │
│ │ 4. Update UI (show success message)                     │ │
│ │ 5. Refresh bug list display                             │ │
│ │ 6. Redirect to bug details page                         │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| **200** | OK | Request successful |
| **201** | Created | New resource created successfully |
| **400** | Bad Request | Missing/invalid data |
| **401** | Unauthorized | Invalid token or not logged in |
| **404** | Not Found | Bug/user doesn't exist |
| **409** | Conflict | Email already exists |
| **500** | Server Error | Database or server error |

---

## Request Headers

Headers are **extra information** sent with every request:

```javascript
{
  "Content-Type": "application/json",      // Data format
  "Authorization": "Bearer eyJhbGc...",    // JWT token for auth
  "User-Agent": "Mozilla/5.0...",          // Browser info
  "Accept": "application/json"             // Expected response format
}
```

### In your app:
```javascript
// Axios automatically adds these:
api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Authorization'] = `Bearer ${token}`
```

---

## Request Body

The **data** you send with POST/PUT requests:

```javascript
// Creating a bug
POST /api/bugs
Body: {
  "title": "Login button broken",
  "description": "Clicking login does nothing",
  "priority": "high",
  "status": "open"
}

// Updating a bug
PUT /api/bugs/123
Body: {
  "status": "closed",
  "priority": "medium"
}
```

---

## Response Body

The **data** the server sends back:

```javascript
// Success response (201 Created)
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Login button broken",
  "description": "Clicking login does nothing",
  "priority": "high",
  "status": "open",
  "createdAt": "2026-01-09T10:30:00Z",
  "createdBy": "60d5ec49c1234567890abcde"
}

// Error response (400 Bad Request)
{
  "message": "Title is required"
}

// Error response (401 Unauthorized)
{
  "message": "Invalid token or not authenticated"
}
```

---

## BugHive API Endpoints

### **Authentication**

**Register New User**
```
POST /api/auth/register
Headers: Content-Type: application/json
Body: {
  "name": "Hillary",
  "email": "hillary@example.com",
  "password": "password123"
}
Response (201): {
  "_id": "...",
  "name": "Hillary",
  "email": "hillary@example.com",
  "token": "eyJhbGc..."
}
```

**Login User**
```
POST /api/auth/login
Body: {
  "email": "hillary@example.com",
  "password": "password123"
}
Response (200): {
  "_id": "...",
  "name": "Hillary",
  "email": "hillary@example.com",
  "token": "eyJhbGc..."
}
```

**Get Current User (Protected)**
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
Response (200): {
  "_id": "...",
  "name": "Hillary",
  "email": "hillary@example.com",
  "role": "user"
}
```

---

### **Bugs**

**Get All Bugs**
```
GET /api/bugs?priority=high&status=open
Headers: Authorization: Bearer <token>
Response (200): [
  { "_id": "1", "title": "Bug 1", ... },
  { "_id": "2", "title": "Bug 2", ... }
]
```

**Get Single Bug**
```
GET /api/bugs/123
Headers: Authorization: Bearer <token>
Response (200): {
  "_id": "123",
  "title": "Login broken",
  "description": "...",
  "priority": "high",
  "status": "open",
  "comments": [...]
}
```

**Create Bug**
```
POST /api/bugs
Headers: Authorization: Bearer <token>
Body: {
  "title": "New bug",
  "description": "Description here",
  "priority": "medium"
}
Response (201): { "_id": "123", "title": "New bug", ... }
```

**Update Bug**
```
PUT /api/bugs/123
Headers: Authorization: Bearer <token>
Body: {
  "status": "closed",
  "priority": "low"
}
Response (200): { "_id": "123", "status": "closed", ... }
```

**Delete Bug**
```
DELETE /api/bugs/123
Headers: Authorization: Bearer <token>
Response (200): { "message": "Bug deleted successfully" }
```

---

### **Comments**

**Add Comment to Bug**
```
POST /api/bugs/123/comments
Headers: Authorization: Bearer <token>
Body: {
  "text": "Fixed in commit abc123"
}
Response (201): {
  "_id": "comment-1",
  "text": "Fixed in commit abc123",
  "createdBy": "user-1",
  "createdAt": "2026-01-09T10:30:00Z"
}
```

**Get Bug Comments**
```
GET /api/bugs/123/comments
Headers: Authorization: Bearer <token>
Response (200): [
  { "_id": "1", "text": "Comment 1", ... },
  { "_id": "2", "text": "Comment 2", ... }
]
```

**Delete Comment**
```
DELETE /api/comments/comment-1
Headers: Authorization: Bearer <token>
Response (200): { "message": "Comment deleted" }
```

---

## How Authentication Works (JWT)

```
1. User registers/logs in
   ↓
2. Backend creates JWT token (like a digital passport)
   Token contains: { userId, email, expiresAt }
   ↓
3. Frontend stores token in localStorage
   ↓
4. For every API request, frontend sends:
   Authorization: Bearer <token>
   ↓
5. Backend checks if token is valid:
   ├─ Valid → Process request
   └─ Invalid/Expired → Return 401 Unauthorized
   ↓
6. Frontend receives 401 → Logout user & redirect to login
```

---

## Making API Calls in React (Your App)

### **Using Axios (in AuthContext)**

```javascript
// Login
const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { 
    email, 
    password 
  })
  // response.data = { _id, name, email, token }
  localStorage.setItem('token', response.data.token)
  return response.data
}

// Register
const register = async (name, email, password) => {
  const response = await api.post('/api/auth/register', { 
    name, 
    email, 
    password 
  })
  localStorage.setItem('token', response.data.token)
  return response.data
}

// Get bugs
const getBugs = async () => {
  const response = await api.get('/api/bugs')
  return response.data
}

// Create bug
const createBug = async (bugData) => {
  const response = await api.post('/api/bugs', bugData)
  return response.data
}

// Update bug
const updateBug = async (bugId, updates) => {
  const response = await api.put(`/api/bugs/${bugId}`, updates)
  return response.data
}

// Delete bug
const deleteBug = async (bugId) => {
  await api.delete(`/api/bugs/${bugId}`)
}
```

---

## Error Handling

```javascript
try {
  const response = await api.post('/api/bugs', bugData)
  console.log('Success:', response.data)
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.log('Status:', error.response.status)
    console.log('Message:', error.response.data.message)
    
    if (error.response.status === 401) {
      // Unauthorized - token invalid
      logout()
    }
  } else if (error.request) {
    // No response from server
    console.log('No response from server')
  } else {
    // Error setting up request
    console.log('Error:', error.message)
  }
}
```

---

## Real-World Example: Creating a Bug

### **What happens when user clicks "Create Bug" in your app:**

```javascript
// 1. User fills form
const formData = {
  title: "Search feature broken",
  description: "Can't find bugs by name",
  priority: "high"
}

// 2. Frontend sends API request
try {
  const response = await api.post('/api/bugs', formData)
  
  // 3. Backend receives request
  // - Checks JWT token in Authorization header
  // - Validates data
  // - Creates bug in MongoDB
  // - Returns created bug
  
  // 4. Frontend receives response (status 201)
  console.log('Bug created:', response.data)
  
  // 5. Update UI
  setMessage('Bug created successfully!')
  setBugs([...bugs, response.data])
  
  // 6. Redirect to bug details
  navigate(`/bugs/${response.data._id}`)
  
} catch (error) {
  // Error handling
  setError(error.response?.data?.message)
}
```

---

## Testing APIs with curl

```bash
# Test backend is running
curl http://localhost:5000/

# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "password":"password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123"
  }'
# Response will include: "token": "eyJhbGc..."

# Get bugs (with token)
curl -X GET http://localhost:5000/api/bugs \
  -H "Authorization: Bearer eyJhbGc..."

# Create bug
curl -X POST http://localhost:5000/api/bugs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "title":"New Bug",
    "description":"Description here",
    "priority":"high"
  }'
```

---

## Key Takeaways

✅ **APIs allow frontend and backend to communicate**

✅ **HTTP Methods**:
- GET = Read data
- POST = Create data
- PUT = Update data
- DELETE = Remove data

✅ **Every request includes headers** with Authorization token

✅ **Backend validates token** to ensure user is authenticated

✅ **Responses have status codes** (200, 201, 400, 401, etc.)

✅ **Error handling** prevents app crashes

✅ **localStorage** stores JWT token for persistent login

---

**Made with ❤️ by Hillary**
