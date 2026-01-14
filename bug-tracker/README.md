# 🔍 BugHive - Modern Bug Tracking System

<div align="center">

![BugHive Banner](https://img.shields.io/badge/BugHive-Bug%20Tracking%20System-667eea?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xNS41IDJIMTVjLTMuMDQgMC01LjUgMi40Ni01LjUgNS41djMuNUg3djRoMi41djguNWg0VjE1SDJWOWg1LjVWNy41QzEwLjUgMy45MSAxMy40MSAxIDE3IDFoMi41djQuNUgxN2MtLjgzIDAtMS41LjY3LTEuNSAxLjV2Mkg2djRoMTFWOC41QzE3IDUuNDYgMTQuNTQgMyAxMS41IDNoNC44NFYyeiIvPjwvc3ZnPg==)

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**A full-stack bug tracking application built with the MERN stack**

[Live Demo](https://your-demo-link.com) · [Report Bug](https://github.com/hillary/bughive/issues) · [Request Feature](https://github.com/hillary/bughive/issues)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure JWT-based authentication with login/register
- **Bug Management** - Create, read, update, and delete bug reports
- **Priority Levels** - Categorize bugs by Low, Medium, High, and Critical priority
- **Status Tracking** - Track bugs through Open, In Progress, and Closed stages
- **Comments System** - Collaborate with team members through threaded comments

### 🎨 User Experience
- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Responsive Design** - Fully responsive across all device sizes
- **Real-time Updates** - Instant feedback on all actions
- **Search & Filter** - Quickly find bugs with powerful filtering options

### 🛠 Technical Highlights
- **RESTful API** - Well-structured backend API with Express.js
- **MongoDB Database** - Flexible NoSQL database for efficient data storage
- **React Context** - Global state management for auth and theme
- **Protected Routes** - Secure route handling with authentication guards
- **Form Validation** - Client and server-side validation

---

## 📸 Screenshots

<div align="center">
<table>
<tr>
<td><img src="./screenshots/home.png" alt="Home Page" width="400"/></td>
<td><img src="./screenshots/dashboard.png" alt="Dashboard" width="400"/></td>
</tr>
<tr>
<td align="center"><strong>Landing Page</strong></td>
<td align="center"><strong>Dashboard</strong></td>
</tr>
<tr>
<td><img src="./screenshots/create-bug.png" alt="Create Bug" width="400"/></td>
<td><img src="./screenshots/bug-details.png" alt="Bug Details" width="400"/></td>
</tr>
<tr>
<td align="center"><strong>Create Bug</strong></td>
<td align="center"><strong>Bug Details</strong></td>
</tr>
</table>
</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hillary/bughive.git
   cd bughive
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bughive
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

5. **Start the development servers**
   
   Backend (from `/backend`):
   ```bash
   npm run dev
   ```
   
   Frontend (from `/frontend`):
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 🏗 Project Structure

```
bughive/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   ├── bugController.js   # Bug CRUD operations
│   │   └── commentController.js
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   ├── Bug.js             # Bug schema
│   │   ├── Comment.js         # Comment schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bugRoutes.js
│   │   └── commentRoutes.js
│   └── server.js              # Express server entry
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── BugCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreateBug.jsx
│   │   │   ├── BugDetails.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css          # Tailwind styles
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Bugs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bugs` | Get all bugs |
| GET | `/api/bugs/:id` | Get single bug |
| POST | `/api/bugs` | Create new bug |
| PUT | `/api/bugs/:id` | Update bug |
| DELETE | `/api/bugs/:id` | Delete bug |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bugs/:bugId/comments` | Get bug comments |
| POST | `/api/bugs/:bugId/comments` | Add comment |
| DELETE | `/api/comments/:id` | Delete comment |

---

## 🛠 Built With

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## 🎯 Future Enhancements

- [ ] Email notifications for bug updates
- [ ] File attachments for bug reports
- [ ] User roles and permissions (Admin, Developer, Tester)
- [ ] Bug assignment to specific users
- [ ] Activity timeline/history
- [ ] Export bugs to CSV/PDF
- [ ] Integration with GitHub Issues
- [ ] Real-time updates with WebSockets

---

## 🚢 Deployment

### Quick Deployment Guide

The easiest way to deploy BugHive is using the automated setup script:

```bash
bash deploy.sh
```

This will guide you through:
1. Setting up MongoDB Atlas (free cloud database)
2. Deploying backend to Render
3. Deploying frontend to Vercel

**For detailed deployment instructions**, see:
- [**VERCEL_DEPLOYMENT_GUIDE.md**](VERCEL_DEPLOYMENT_GUIDE.md) - Complete deployment walkthrough
- [**vercel.json**](vercel.json) - Vercel configuration

### Live Demo

🎉 **BugHive is live!** Visit: [https://bughive-mern-bug-trackerhillary.vercel.app](https://bughive-mern-bug-trackerhillary.vercel.app)

### Deployment Stack

- **Frontend**: React + Vite → **Vercel** (CDN, Auto-scaling)
- **Backend**: Express.js → **Render** (Node.js, Auto-restart on crash)
- **Database**: MongoDB → **MongoDB Atlas** (Cloud-hosted, Free tier available)
- **Security**: HTTPS, Environment variables, IP whitelisting

---

## 👨‍💻 Author

<div align="center">
<img src="https://avatars.githubusercontent.com/hillary" width="100" style="border-radius: 50%"/>

**Hillary**

Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hillary)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hillary)
[![Portfolio](https://img.shields.io/badge/Portfolio-667eea?style=for-the-badge&logo=About.me&logoColor=white)](https://hillary.dev)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

Made with ❤️ and lots of ☕ by Hillary

</div>
