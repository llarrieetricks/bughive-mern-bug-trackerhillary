# VS Code Troubleshooting Guide

## Quick Reference

| Problem                        | Solution                              | Quick Link                                  |
| ------------------------------ | ------------------------------------- | ------------------------------------------- |
| Linting warnings still showing | Run cleanup script + reload VS Code   | [Linting Issues](#linting-issues)           |
| Extensions not installing      | Manual install from Extensions panel  | [Extension Issues](#extension-issues)       |
| Debugging not working          | Check ports 5000/5173 are available   | [Debugging Issues](#debugging-issues)       |
| Prettier not formatting        | Set as default formatter              | [Formatting Issues](#formatting-issues)     |
| IntelliSense not working       | Reload window + clear workspace cache | [IntelliSense Issues](#intellisense-issues) |

---

## Detailed Troubleshooting

### Linting Issues

#### Problem: "Unknown @tailwind/@apply" warnings still appearing

**Root Cause**: VS Code's CSS validator doesn't recognize Tailwind PostCSS directives.

**Solutions** (try in order):

1. **Quick Fix - Reload VS Code**

   ```
   Press: Ctrl+Shift+P (Cmd+Shift+P on Mac)
   Type: Reload Window
   Press: Enter
   ```

2. **Clear Settings Cache**

   ```bash
   # Linux/Mac
   ./cleanup-vscode.sh

   # Windows
   cleanup-vscode.bat
   ```

3. **Manual Cache Clear**

   - Close VS Code
   - Delete `.vscode/workspaceStorage` folder
   - Reopen project

4. **Verify Settings**

   ```
   Ctrl+Shift+P → Preferences: Open Settings (JSON)
   ```

   Ensure these lines exist:

   ```json
   "css.lint.unknownAtRules": "ignore",
   "css.lint.compatibleVendorPrefixes": "ignore",
   "css.lint.vendorPrefix": "ignore"
   ```

5. **Last Resort - Reset CSS Linter**
   ```
   Ctrl+Shift+P → Developer: Reload Window
   Then: Ctrl+Shift+P → Developer: Toggle Developer Tools
   Clear cache from DevTools → Application → Storage
   ```

---

### Extension Issues

#### Problem: Recommended extensions not installing automatically

**Solutions**:

1. **Manual Install Method**

   ```
   Ctrl+Shift+X (open Extensions panel)
   Click "Show Recommended"
   Click "Install All"
   ```

2. **Install Specific Extension**

   ```
   Ctrl+Shift+X
   Search: "Tailwind CSS IntelliSense"
   Click Install
   ```

3. **From Command Palette**

   ```
   Ctrl+Shift+P → Extensions: Install Workspace Recommended Extensions
   ```

4. **Via CLI** (if VS Code installed)
   ```bash
   code --install-extension bradlc.vscode-tailwindcss
   code --install-extension esbenp.prettier-vscode
   code --install-extension dbaeumer.vscode-eslint
   ```

#### Problem: Extension causing slow performance

**Solution**:

```
Ctrl+Shift+P → Developer: Show Running Extensions
Identify slow extension
Disable or uninstall it
```

---

### Debugging Issues

#### Problem: Breakpoints not working

**Causes & Solutions**:

1. **Backend debugger not attached**

   - Ensure MongoDB is running: `mongod`
   - Check port 5000 is available: `lsof -i :5000`
   - Restart: `Ctrl+C` then run task again

2. **Frontend debugger needs Chrome**

   - Install Google Chrome or Chromium
   - Use "Frontend (Chrome)" debug configuration
   - Install Debugger for Chrome extension

3. **Port conflicts**
   ```bash
   # Check which process is using port 5000
   lsof -i :5000
   # Kill process (replace PID with actual ID)
   kill -9 PID
   ```

#### Problem: "Cannot find node_modules/vite"

**Solution**:

```
Ctrl+` (open terminal)
cd frontend && npm install
cd ../backend && npm install
```

#### Problem: "MongoDB connection failed"

**Solution**:

```bash
# Check if MongoDB is running
mongod

# In another terminal, verify connection
mongo
# Should show: >

# Exit MongoDB
exit
```

---

### Formatting Issues

#### Problem: Prettier not formatting on save

**Solutions**:

1. **Set Prettier as Default**

   ```
   Ctrl+Shift+P → Format Document With...
   Select: Prettier - Code formatter
   (repeat for each file type)
   ```

2. **Enable Format on Save**

   ```
   Ctrl+Shift+P → Preferences: Open Settings (JSON)
   Add/verify:
   ```

   ```json
   "editor.formatOnSave": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode"
   ```

3. **Prettier Not Installed**

   ```
   Ctrl+Shift+X → Search: Prettier
   Install: "Prettier - Code formatter"
   Reload window
   ```

4. **File Not Supported**
   - Prettier only supports: JS, JSX, TS, TSX, JSON, CSS, SCSS, Less, HTML, YAML, GraphQL, Markdown
   - For other formats, use EditorConfig instead

---

### IntelliSense Issues

#### Problem: Tailwind CSS classes not showing autocomplete

**Solution 1: Restart IntelliSense**

```
Ctrl+Shift+P → Tailwind CSS: Restart IntelliSense Server
```

**Solution 2: Verify Extension Installed**

```
Ctrl+Shift+X → Search: Tailwind CSS IntelliSense
Should show: "bradlc.vscode-tailwindcss" installed
```

**Solution 3: Check tailwind.config.js**

```bash
# Verify file exists
ls frontend/tailwind.config.js

# Verify content looks correct
cat frontend/tailwind.config.js
```

**Solution 4: Workspace Trust**

```
If you see "Workspace not trusted" warning:
1. Click "Trust Workspace"
2. Reload window
3. Try autocomplete again
```

#### Problem: React/JSX IntelliSense not working

**Solutions**:

1. **Install ES7+ React/Redux Snippets**

   ```
   Ctrl+Shift+X → Search: ES7+ React/Redux/React-Native snippets
   Install version by dsznajder
   ```

2. **Enable JSX Support**

   ```
   Ctrl+Shift+P → Preferences: Open Settings (JSON)
   Add:
   ```

   ```json
   "emmet.includeLanguages": {
     "javascript": "javascriptreact"
   }
   ```

3. **Reload Everything**
   ```
   Ctrl+Shift+P → Reload Window
   ```

---

### Performance Issues

#### Problem: VS Code running slow

**Causes & Solutions**:

1. **Too many extensions enabled**

   ```
   Ctrl+Shift+P → Developer: Show Running Extensions
   Disable unused extensions
   ```

2. **File watcher consuming CPU**

   ```
   Ctrl+Shift+P → Preferences: Open Settings (JSON)
   Ensure "files.watcherExclude" includes:
   ```

   ```json
   "files.watcherExclude": {
     "**/node_modules": true,
     "**/dist": true,
     "**/.git": true
   }
   ```

3. **Large node_modules folders**

   ```bash
   # These are already excluded from watch, but check:
   du -sh frontend/node_modules backend/node_modules

   # If >500MB each, consider clean install
   cd frontend && rm -rf node_modules && npm install
   cd ../backend && rm -rf node_modules && npm install
   ```

4. **Workspace storage bloated**
   ```bash
   # Clear workspace storage
   rm -rf ~/.config/Code/User/workspaceStorage
   # Then reload VS Code
   ```

#### Problem: Terminal/debugger output slow to display

**Solution**:

```
Ctrl+` (open integrated terminal)
Ctrl+Shift+P → Terminal: Select Default Profile
Choose bash (not PowerShell if on Windows)
```

---

## Advanced Troubleshooting

### Check VS Code Version Compatibility

```bash
# Check VS Code version
code --version

# Should be 1.85+ for best support
# Update if older:
# - Linux: sudo apt update && sudo apt upgrade code
# - Mac: brew upgrade visual-studio-code
# - Windows: Download from https://code.visualstudio.com
```

### Check Node.js Compatibility

```bash
# Check Node.js version
node --version

# Should be 16+ for MERN stack
# Check npm version
npm --version

# Should be 8+
```

### Verify All Dependencies

```bash
# Check frontend dependencies
cd frontend && npm list react react-dom react-router-dom

# Check backend dependencies
cd ../backend && npm list express mongoose axios
```

### Debug Extension Issues

```
Ctrl+Shift+P → Developer: Show Logs
Select: Extension Host
Look for errors related to Tailwind, Prettier, ESLint
```

### Check Workspace Trust

```
If you see red banner saying "Workspace not trusted":
1. Click "Trust Workspace"
2. Or: Ctrl+Shift+P → Developer: Toggle Trusted Workspace
3. Extensions need workspace trust to function
```

---

## Common Error Messages & Fixes

### "Command not found: code"

```bash
# Add VS Code to PATH
# Linux: Already in PATH if installed via package manager
# Mac: Run VS Code → Cmd+Shift+P → "Shell Command: Install 'code' command in PATH"
# Windows: Add C:\Users\[YourUser]\AppData\Local\Programs\Microsoft VS Code\bin to PATH
```

### "Port 5000/5173 already in use"

```bash
# Find and kill process using port
# Linux/Mac:
lsof -i :5000
kill -9 [PID]

# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

### "Module not found: React"

```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### "Cannot find MongoDB"

```bash
# Install MongoDB Community Edition
# Linux: sudo apt install mongodb
# Mac: brew install mongodb-community
# Windows: Download from https://www.mongodb.com/try/download/community
```

---

## When to Use Cleanup Scripts

Run cleanup scripts in these situations:

1. ✅ **After major VS Code update** - Cache may be incompatible
2. ✅ **Settings changes not taking effect** - Clears editor cache
3. ✅ **Extensions misbehaving** - Refreshes extension cache
4. ✅ **Performance degradation** - Removes bloated workspace storage
5. ✅ **Linting warnings won't go away** - Forces re-validation
6. ❌ **Don't run every day** - Not necessary for normal operation

---

## Getting Help

### Check These Resources First

1. **VS Code docs**: https://code.visualstudio.com/docs
2. **Extension docs**: Check extension page in VS Code marketplace
3. **GitHub issues**: Search extension GitHub for your issue
4. **Stack Overflow**: Search before asking, tag `vscode`

### Report a Bug

If issue persists after troubleshooting:

```
Ctrl+Shift+P → Help: Report Issue
Include:
- Extension name/version
- Error message (copy from Output panel)
- Reproduction steps
- VS Code version (code --version)
```

---

## Prevention Tips

### Keep VS Code Healthy

1. **Update regularly** - Security fixes and improvements
2. **Update extensions** - Bug fixes and new features
3. **Monitor performance** - Check running extensions monthly
4. **Clean up occasionally** - Run cleanup script quarterly
5. **Review settings** - Check for conflicting settings after updates

### Recommended Maintenance Schedule

- **Weekly**: Update extensions (automatic by default)
- **Monthly**: Check running extensions performance
- **Quarterly**: Run cleanup scripts
- **Bi-annually**: Clean node_modules and reinstall

---

**Need more help?** Check `.vscode/README.md` for configuration details!
