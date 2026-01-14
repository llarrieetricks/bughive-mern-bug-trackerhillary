# 📚 BugHive Documentation Index

Welcome to BugHive! This is your complete guide to the project. Start here to find what you need.

---

## 🚀 Getting Started (Choose Your Path)

### I want to...

#### Deploy to Production (You're Here!)
1. **Start here**: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) (5 min read)
2. **Step-by-step guide**: [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) (30-45 min)
3. **Checklist**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) (reference while deploying)
4. **Run automated setup**: `bash deploy.sh` (guided interactive)
5. **Troubleshoot**: [QUICK_TROUBLESHOOTING.md](QUICK_TROUBLESHOOTING.md) (if issues arise)

#### Set Up My Development Environment
1. **VS Code setup**: [.vscode/README.md](.vscode/README.md) (10 min)
2. **Quick reference**: [VSCODE_QUICK_REFERENCE.md](VSCODE_QUICK_REFERENCE.md)
3. **Troubleshooting**: [VSCODE_TROUBLESHOOTING.md](VSCODE_TROUBLESHOOTING.md)
4. **Cleanup**: `bash cleanup-vscode.sh` (Linux/Mac) or `cleanup-vscode.bat` (Windows)

#### Understand the API
1. **Full API guide**: [API_GUIDE.md](API_GUIDE.md) (complete reference)
2. **System overview**: [OPERATING_GUIDE.md](OPERATING_GUIDE.md) (architecture)
3. **Test API**: Use Postman or [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

#### Run the Project Locally
1. **Prerequisites**: Node.js 18+, MongoDB, npm
2. **Install**: `npm install && npm install --prefix frontend && npm install --prefix backend`
3. **Start**: `Tasks: Run Task → Start Both Servers`
4. **Visit**: http://localhost:5173

#### Contribute or Modify Code
1. **Architecture**: [OPERATING_GUIDE.md](OPERATING_GUIDE.md)
2. **Project structure**: See "📁 Directory Structure" section below
3. **Coding standards**: [.editorconfig](.editorconfig) (formatting rules)
4. **Git workflow**: Commit → Push → Auto-deploy

---

## 📖 Complete Documentation

### 🎯 Essential Files

| File | Purpose | Time | When to Read |
|------|---------|------|--------------|
| [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) | Quick overview of deployment setup | 5 min | Before deploying |
| [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) | Complete deployment walkthrough | 30 min | To deploy |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Verification checklist | Ref | During/after deployment |
| [QUICK_TROUBLESHOOTING.md](QUICK_TROUBLESHOOTING.md) | Common issues & quick fixes | Ref | When something breaks |
| [README.md](README.md) | Project overview | 10 min | Getting familiar |

### 🛠 Development Setup

| File | Purpose | Time | When to Read |
|------|---------|------|--------------|
| [.vscode/README.md](.vscode/README.md) | VS Code configuration guide | 15 min | Setting up VS Code |
| [VSCODE_QUICK_REFERENCE.md](VSCODE_QUICK_REFERENCE.md) | Keyboard shortcuts & commands | Ref | While coding |
| [VSCODE_TROUBLESHOOTING.md](VSCODE_TROUBLESHOOTING.md) | Development environment issues | Ref | When stuck |
| [VSCODE_CLEANUP.md](VSCODE_CLEANUP.md) | Cleaning VS Code cache | 10 min | Fixing linting errors |

### 📚 Project Knowledge

| File | Purpose | Time | When to Read |
|------|---------|------|--------------|
| [API_GUIDE.md](API_GUIDE.md) | Complete API documentation | 30 min | Building frontend/testing |
| [OPERATING_GUIDE.md](OPERATING_GUIDE.md) | System architecture & flows | 20 min | Understanding codebase |

### ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| [vercel.json](vercel.json) | Vercel deployment config |
| [.prettierrc](.prettierrc) | Code formatter settings |
| [.editorconfig](.editorconfig) | Editor formatting rules |
| [.vscode/settings.json](.vscode/settings.json) | VS Code workspace config |
| [.vscode/launch.json](.vscode/launch.json) | Debug configurations |
| [.vscode/tasks.json](.vscode/tasks.json) | Development tasks |

### 🚀 Scripts

| Script | Purpose | How to Run |
|--------|---------|-----------|
| `deploy.sh` | Interactive deployment guide | `bash deploy.sh` |
| `verify-setup.sh` | Verify environment setup | `bash verify-setup.sh` |
| `cleanup-vscode.sh` | Clean VS Code cache (Linux/Mac) | `bash cleanup-vscode.sh` |
| `cleanup-vscode.bat` | Clean VS Code cache (Windows) | `cleanup-vscode.bat` |

---

## 📁 Directory Structure

```
bug-tracker/
│
├── 📄 Documentation (Read these!)
│   ├── README.md                           ← Project overview
│   ├── DEPLOYMENT_SUMMARY.md               ← Quick deployment intro
│   ├── VERCEL_DEPLOYMENT_GUIDE.md          ← Complete deployment guide
│   ├── DEPLOYMENT_CHECKLIST.md             ← Pre-deployment checklist
│   ├── QUICK_TROUBLESHOOTING.md            ← Common issues
│   ├── VSCODE_CLEANUP.md                   ← Clean VS Code
│   ├── VSCODE_QUICK_REFERENCE.md           ← Dev shortcuts
│   ├── VSCODE_TROUBLESHOOTING.md           ← Dev environment help
│   ├── API_GUIDE.md                        ← API documentation
│   ├── OPERATING_GUIDE.md                  ← System architecture
│   └── THIS FILE (INDEX.md)                ← You are here!
│
├── ⚙️ Configuration
│   ├── .editorconfig                       ← Editor formatting
│   ├── .prettierrc                         ← Prettier config
│   ├── .prettierignore                     ← Prettier ignores
│   ├── .gitignore                          ← Git ignores
│   ├── vercel.json                         ← Vercel config
│   └── .vscode/                            ← VS Code config
│       ├── settings.json                   ← Editor settings
│       ├── launch.json                     ← Debug config
│       ├── tasks.json                      ← Dev tasks
│       ├── extensions.json                 ← Recommended extensions
│       └── README.md                       ← VS Code guide
│
├── 🚀 Scripts
│   ├── deploy.sh                           ← Interactive deployment
│   ├── verify-setup.sh                     ← Verify environment
│   ├── cleanup-vscode.sh                   ← Clean cache (Linux/Mac)
│   └── cleanup-vscode.bat                  ← Clean cache (Windows)
│
├── 🎨 Frontend (React + Vite)
│   ├── public/                             ← Static assets
│   ├── src/
│   │   ├── App.jsx                         ← Root component
│   │   ├── main.jsx                        ← Entry point
│   │   ├── index.css                       ← Tailwind + custom CSS
│   │   ├── components/                     ← Reusable components
│   │   │   └── Navbar.jsx                  ← Navigation & theme toggle
│   │   ├── context/                        ← Global state
│   │   │   ├── AuthContext.jsx             ← Auth state & functions
│   │   │   └── ThemeContext.jsx            ← Dark/light mode
│   │   ├── pages/                          ← Page components
│   │   │   ├── Home.jsx                    ← Landing page
│   │   │   ├── Register.jsx                ← Sign up
│   │   │   ├── Login.jsx                   ← Sign in
│   │   │   ├── Dashboard.jsx               ← Bug list
│   │   │   ├── CreateBug.jsx               ← Create bug
│   │   │   ├── BugDetails.jsx              ← Bug view + comments
│   │   │   └── NotFound.jsx                ← 404 page
│   │   └── services/                       ← API calls
│   │       ├── api.js                      ← Axios setup
│   │       └── bugService.js               ← Bug API functions
│   ├── .env.development                    ← Dev environment
│   ├── .env.production                     ← Prod environment
│   ├── tailwind.config.js                  ← Tailwind config
│   ├── vite.config.js                      ← Vite config
│   └── package.json
│
├── 🔌 Backend (Express + MongoDB)
│   ├── server.js                           ← Express server
│   ├── config/
│   │   └── db.js                           ← MongoDB connection
│   ├── models/                             ← Mongoose schemas
│   │   ├── User.js                         ← User model
│   │   ├── Bug.js                          ← Bug model
│   │   └── Comment.js                      ← Comment model
│   ├── controllers/                        ← Route logic
│   │   ├── authController.js               ← Auth endpoints
│   │   ├── bugController.js                ← Bug endpoints
│   │   └── commentController.js            ← Comment endpoints
│   ├── middleware/
│   │   └── auth.js                         ← JWT verification
│   ├── routes/                             ← API routes
│   │   ├── authRoutes.js                   ← /api/auth
│   │   ├── bugRoutes.js                    ← /api/bugs
│   │   └── commentRoutes.js                ← /api/comments
│   ├── .env                                ← Environment variables
│   ├── .env.example                        ← Example env file
│   └── package.json
│
├── 📋 API Tests
│   └── api-tests/                          ← Postman/REST collections
│
└── 🔧 Root Files
    ├── .gitignore                          ← Git ignores
    ├── .env.example                        ← Example environment
    └── package.json                        ← Root npm config
```

---

## 🎯 Common Tasks

### Deploy the App
```bash
# Option 1: Interactive guided deployment
bash deploy.sh

# Option 2: Manual steps
# 1. Create MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
# 2. Create Render account (https://render.com)
# 3. Deploy backend to Render
# 4. Deploy frontend to Vercel
# See VERCEL_DEPLOYMENT_GUIDE.md for details
```

### Run Locally
```bash
# Terminal 1: Backend
cd backend && node server.js

# Terminal 2: Frontend
cd frontend && npm run dev

# Visit: http://localhost:5173
```

### Format Code
```bash
# Format all files
npm run format

# Or use VS Code
Ctrl+Shift+F (format document)
```

### Debug
```bash
# Press F5 in VS Code to start debugger
# Or open DevTools: F12

# Backend debugging:
F5 → Backend (Node.js)

# Frontend debugging:
F5 → Frontend (Chrome)
```

### Git Workflow
```bash
# Check status
git status

# Commit changes
git add .
git commit -m "Your message"

# Push to GitHub
git push origin main

# Auto-deploys to Vercel/Render!
```

---

## 🆘 Need Help?

### Quick Navigation
| Issue | Go To |
|-------|-------|
| Deploy not working | [QUICK_TROUBLESHOOTING.md](QUICK_TROUBLESHOOTING.md) |
| VS Code problems | [VSCODE_TROUBLESHOOTING.md](VSCODE_TROUBLESHOOTING.md) |
| How to use API | [API_GUIDE.md](API_GUIDE.md) |
| Understand architecture | [OPERATING_GUIDE.md](OPERATING_GUIDE.md) |
| Setting up IDE | [.vscode/README.md](.vscode/README.md) |
| Before deployment | [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) |

### Deployment Help
1. Check [QUICK_TROUBLESHOOTING.md](QUICK_TROUBLESHOOTING.md) first
2. Read [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) for details
3. Verify checklist in [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
4. Check logs:
   - Vercel: Dashboard → Deployments → View Logs
   - Render: Dashboard → Logs
   - MongoDB: Atlas → Metrics

### Development Help
1. Check [VSCODE_TROUBLESHOOTING.md](VSCODE_TROUBLESHOOTING.md)
2. Review [VSCODE_QUICK_REFERENCE.md](VSCODE_QUICK_REFERENCE.md)
3. Check [OPERATING_GUIDE.md](OPERATING_GUIDE.md) for architecture
4. Review [API_GUIDE.md](API_GUIDE.md) for endpoint details

---

## 📊 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.3 |
| **Bundler** | Vite | 5.4 |
| **Styling** | Tailwind CSS | 3.4 |
| **Backend** | Express.js | 5.0 |
| **Database** | MongoDB | Latest |
| **Auth** | JWT | - |
| **Runtime** | Node.js | 18+ |
| **Deployment** | Vercel + Render | - |

---

## 📝 File Quick Reference

| Question | Answer File |
|----------|------------|
| "How do I deploy?" | [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) |
| "How do I set up VS Code?" | [.vscode/README.md](.vscode/README.md) |
| "What APIs are available?" | [API_GUIDE.md](API_GUIDE.md) |
| "How does the app work?" | [OPERATING_GUIDE.md](OPERATING_GUIDE.md) |
| "What keyboard shortcuts exist?" | [VSCODE_QUICK_REFERENCE.md](VSCODE_QUICK_REFERENCE.md) |
| "Something's broken, help!" | [QUICK_TROUBLESHOOTING.md](QUICK_TROUBLESHOOTING.md) or [VSCODE_TROUBLESHOOTING.md](VSCODE_TROUBLESHOOTING.md) |
| "Before I deploy, what should I check?" | [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) |
| "What should I do to clean up VS Code?" | [VSCODE_CLEANUP.md](VSCODE_CLEANUP.md) |

---

## ✨ You're All Set!

You now have:
- ✅ Complete documentation for deployment
- ✅ Step-by-step guides with examples
- ✅ Troubleshooting references
- ✅ Development environment setup
- ✅ API documentation
- ✅ Architecture overview
- ✅ Automated deployment script
- ✅ Verification checklist

### Your Next Steps
1. **Choose your path** (see "Getting Started" section)
2. **Follow the guides** for your specific task
3. **Use this index** as your navigation hub
4. **Refer back** when you have questions

---

## 🚀 Ready?

**Choose your next step:**
- 🌍 **Deploy to production**: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
- 💻 **Set up development**: [.vscode/README.md](.vscode/README.md)
- 📚 **Learn the API**: [API_GUIDE.md](API_GUIDE.md)
- 🏗️ **Understand architecture**: [OPERATING_GUIDE.md](OPERATING_GUIDE.md)
- 🐛 **Fix something**: [QUICK_TROUBLESHOOTING.md](QUICK_TROUBLESHOOTING.md)

---

**Welcome to BugHive! Happy coding! 🎉**

---

*Last updated: January 14, 2026*
*All documentation is regularly maintained and kept up-to-date*
