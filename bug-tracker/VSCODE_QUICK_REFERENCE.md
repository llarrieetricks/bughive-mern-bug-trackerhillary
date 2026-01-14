# VS Code Quick Reference Card

## 🚀 Quick Start (30 seconds)

```bash
# 1. Start both servers
Tasks: Run Task → Start Both Servers

# 2. Open browser
http://localhost:5173

# 3. Debug (optional)
Press F5 → Select Backend or Frontend
```

---

## ⌨️ Essential Keyboard Shortcuts

| Shortcut        | Action           | Platform      |
| --------------- | ---------------- | ------------- |
| `Ctrl+Shift+P`  | Command Palette  | Windows/Linux |
| `Cmd+Shift+P`   | Command Palette  | Mac           |
| ` Ctrl+``  `    | Toggle Terminal  | Windows/Linux |
| ` Cmd+``  `     | Toggle Terminal  | Mac           |
| `F5`            | Start Debugging  | All           |
| `Shift+F5`      | Stop Debugging   | All           |
| `Ctrl+Shift+F`  | Format Document  | Windows/Linux |
| `Cmd+Shift+F`   | Format Document  | Mac           |
| `Ctrl+K Ctrl+F` | Format Selection | Windows/Linux |
| `Cmd+K Cmd+F`   | Format Selection | Mac           |
| `Ctrl+Shift+X`  | Extensions       | Windows/Linux |
| `Cmd+Shift+X`   | Extensions       | Mac           |
| `Ctrl+G`        | Go to Line       | All           |
| `Ctrl+F`        | Find in File     | All           |
| `Ctrl+H`        | Find & Replace   | All           |
| `Ctrl+J`        | Toggle Panel     | All           |

---

## 📋 Common Commands (Ctrl+Shift+P)

```
Reload Window                      - Restart VS Code
Format Document                    - Format current file
Format Document With...            - Choose formatter
Developer: Show Logs               - View error logs
Developer: Open Developer Tools    - Inspect browser
Tailwind CSS: Restart              - Restart Tailwind
Extensions: Install Workspace...   - Install recommended
Terminal: Create New Terminal      - New terminal
Debug: Run and Debug               - Start debugger
Tasks: Run Task                    - Run any task
```

---

## 🔧 Common Tasks

```
Tasks: Run Task → Start Backend         - Only backend server
Tasks: Run Task → Start Frontend        - Only frontend server
Tasks: Run Task → Start Both Servers    - Both servers (recommended)
Tasks: Run Task → Build Frontend       - Production build
Tasks: Run Task → Install Fresh        - Clean reinstall
Tasks: Run Task → Clean Node Modules   - Remove node_modules
```

---

## 📁 File Structure Quick Guide

```
bug-tracker/
├── .vscode/                    ← All VS Code config
│   ├── settings.json          ← Main settings
│   ├── extensions.json        ← Recommended extensions
│   ├── launch.json            ← Debug configurations
│   ├── tasks.json             ← Development tasks
│   └── README.md              ← Detailed guide
├── backend/                    ← Express server (port 5000)
│   ├── server.js              ← Entry point
│   ├── models/                ← Mongoose schemas
│   ├── controllers/           ← Route logic
│   ├── routes/                ← API endpoints
│   └── package.json
├── frontend/                   ← React app (port 5173)
│   ├── src/
│   │   ├── App.jsx            ← Main component
│   │   ├── main.jsx           ← Entry point
│   │   ├── context/           ← Global state (Auth, Theme)
│   │   ├── pages/             ← Page components
│   │   ├── components/        ← Reusable components
│   │   ├── services/          ← API calls
│   │   └── index.css          ← Tailwind CSS
│   └── package.json
└── .editorconfig              ← Code formatting rules
```

---

## 🌐 Important URLs

| Service       | URL                                                               | Purpose           |
| ------------- | ----------------------------------------------------------------- | ----------------- |
| Frontend App  | http://localhost:5173                                             | View React app    |
| Backend API   | http://localhost:5000                                             | API requests      |
| API Docs      | `/api/docs` (if implemented)                                      | API documentation |
| MongoDB Local | localhost:27017                                                   | Database          |
| Git Hub       | https://github.com/llarrieetricks/bughive-mern-bug-trackerhillary | Repository        |

---

## 💾 Database Connection

```javascript
// MongoDB Connection String (backend)
mongodb://localhost:27017/bughive

// Test connection
mongod              // Start MongoDB
mongo               // Open shell
show databases      // List databases
use bughive         // Switch to bughive
show collections    // List collections
exit                // Quit
```

---

## 🔍 Debugging Tips

### Set Breakpoint

```
Click on line number (red dot appears)
Press F5 to start debug session
Execution stops at breakpoint
```

### Inspect Variables

```
Variables panel: Shows all local variables
Watch panel: Add expressions to watch
Debug console: Run JavaScript code in context
```

### Conditional Breakpoint

```
Right-click breakpoint → Edit Breakpoint
Enter condition: e.g., count > 10
Breaks only when true
```

---

## 🎨 Tailwind CSS Tips

### Class Autocomplete

```jsx
// Type class=" → IntelliSense shows suggestions
<div className="flex items-center">
```

### View Applied Styles

```
Hover over class name → Tailwind shows all CSS rules
```

### Common Patterns

```jsx
// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Dark mode
<div className="bg-white dark:bg-gray-900">

// Hover states
<button className="bg-blue-500 hover:bg-blue-600">

// Conditional (with clsx)
import clsx from 'clsx'
<div className={clsx({
  'text-red-500': error,
  'text-green-500': success
})}>
```

---

## ✅ Pre-Deploy Checklist

Before pushing to production:

- [ ] `npm run build` succeeds in frontend
- [ ] No console errors in DevTools
- [ ] All API calls working in browser Network tab
- [ ] Dark mode toggle works
- [ ] Login/Register flows tested
- [ ] Responsive design checked (mobile/tablet/desktop)
- [ ] Git commits are clean
- [ ] `.env` files are in `.gitignore`
- [ ] No `console.log()` statements in production code
- [ ] Tests pass (if applicable)

---

## 🚨 Emergency Fixes

### Issue: Everything broken

```bash
# Nuclear option - clean everything
rm -rf frontend/node_modules backend/node_modules
npm install
npm install --prefix frontend
npm install --prefix backend
# Restart VS Code: Ctrl+R
```

### Issue: Port already in use

```bash
# Find culprit
lsof -i :5000      # for backend
lsof -i :5173      # for frontend

# Kill process
kill -9 [PID]
```

### Issue: Git conflicts

```bash
# Reset to clean state
git reset --hard HEAD
git pull origin main
```

---

## 📚 Documentation Files

- **VSCODE_CLEANUP.md** - Detailed cleanup guide with platform-specific instructions
- **VSCODE_TROUBLESHOOTING.md** - Troubleshooting guide for all common issues
- **.vscode/README.md** - Complete VS Code configuration documentation
- **OPERATING_GUIDE.md** - Full system architecture and operation guide
- **API_GUIDE.md** - Complete API documentation with examples
- **README.md** - Project overview and setup

---

## 💡 Pro Tips

1. **Search in files**: `Ctrl+Shift+F` to find across entire project
2. **Goto definition**: `Ctrl+Click` on any symbol to jump to definition
3. **Rename refactor**: `F2` to rename symbol across entire project
4. **Quick file open**: `Ctrl+P` to open any file by name
5. **Git blame**: Right-click line → "Blame Line" (with GitLens)
6. **Format on demand**: Select code → `Ctrl+Shift+F`
7. **Bookmark lines**: `Ctrl+B` in VS Code Bookmarks extension
8. **Split editor**: `Ctrl+\` to open side-by-side editor

---

## 🔗 Resource Links

- **VS Code Official Docs**: https://code.visualstudio.com/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **MongoDB Manual**: https://docs.mongodb.com/manual
- **Express.js Guide**: https://expressjs.com
- **MDN Web Docs**: https://developer.mozilla.org

---

**Bookmark this card and refer to it while coding!** 🚀
