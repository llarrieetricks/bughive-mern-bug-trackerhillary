# Quick Deployment Troubleshooting

## 🔴 Frontend Won't Deploy on Vercel

### Symptom
Build fails or deployment shows error

### Quick Fixes (in order)
```bash
# 1. Check build command locally
cd frontend && npm run build

# 2. If that fails, update package.json
npm install --legacy-peer-deps

# 3. Check Node version in Vercel settings
# Should be 18+

# 4. Check build output directory
# Should be: frontend/dist

# 5. Verify vercel.json is correct
cat vercel.json
```

### If still failing
- Clear Vercel build cache: Dashboard → Settings → Advanced → Clear Build Cache
- Restart deployment: Click "Redeploy"
- Check logs for specific error

---

## 🔴 Backend Won't Connect

### Symptom
Frontend shows "Cannot connect to API" or 502 errors

### Quick Fixes
```bash
# 1. Check backend is running
# Render Dashboard → Services → bughive-backend
# Should show "Live" status (green)

# 2. Check logs for errors
# Render Dashboard → Logs tab
# Should see "Server running on port 5000"
# Should see "MongoDB Connected"

# 3. Verify MongoDB connection
# In Render Logs, look for:
# ✓ "MongoDB Connected" = Good
# ✗ "ECONNREFUSED" = MongoDB URL wrong
# ✗ "Authentication failed" = Password wrong

# 4. Check environment variables
# Render Dashboard → Variables
# Verify MONGODB_URI and JWT_SECRET are set
```

### Nuclear option
```bash
# In Render:
# 1. Click "Restart Service"
# 2. Wait 2 minutes
# 3. Check logs again
```

---

## 🔴 CORS Errors

### Symptom
Browser console shows:
```
Access to XMLHttpRequest at 'https://backend-url.com' 
from origin 'https://frontend-url.com' has been blocked by CORS policy
```

### Quick Fix
Update `backend/server.js`:
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://bughive-mern-bug-trackerhillary.vercel.app',  // Your frontend URL
    'https://bughive-backend.onrender.com'  // Your backend URL
  ],
  credentials: true
}));
```

Then redeploy backend:
```bash
git add backend/server.js
git commit -m "Fix CORS configuration"
git push origin main
```

---

## 🔴 MongoDB Won't Connect

### Symptom
Logs show:
```
MongoError: connect ECONNREFUSED
or
MongoError: authentication failed
```

### Checklist
- [ ] Connection string is correct format: `mongodb+srv://username:password@...`
- [ ] Username and password are exact (case-sensitive)
- [ ] No special characters in password that need escaping
- [ ] Database user exists in MongoDB Atlas (Security → Database Access)
- [ ] IP whitelist includes 0.0.0.0/0 or your Render server IP
- [ ] Cluster is "Available" (not "Paused" or "Terminating")

### Test connection directly
```bash
# Use MongoDB CLI to test
mongosh "mongodb+srv://username:password@cluster0.xxx.mongodb.net/bughive"

# If it connects, the string works
# If it fails, check username/password/whitelist
```

---

## 🔴 Dark Mode Not Persisting

### Symptom
Dark/light mode resets on page reload

### Solution
Check `frontend/src/context/ThemeContext.jsx`:
```javascript
// Should use localStorage
const [isDarkMode, setIsDarkMode] = useState(() => {
  const saved = localStorage.getItem('theme');
  return saved === 'dark';
});

// Save to localStorage
const toggleTheme = () => {
  setIsDarkMode(prev => {
    localStorage.setItem('theme', !prev ? 'dark' : 'light');
    return !prev;
  });
};
```

---

## 🔴 500 Internal Server Error

### Symptom
All requests return 500, logs show error

### Check in this order
```bash
# 1. Check if MongoDB is connected
# Render Logs should show: "MongoDB Connected"

# 2. Check for undefined environment variables
# Render Settings → Variables
# Verify all required vars are set

# 3. Check for code errors
# Search logs for "Error:" or "TypeError"
# Look for specific line numbers

# 4. Check recent changes
# Did you just push changes?
# The error might be in new code

# 5. Restart service
# Render Dashboard → Restart Service
```

### If you can't find it
```bash
# Add detailed logging to see what's happening
console.error('Detailed error:', error);

# Then redeploy and check logs
git add .
git commit -m "Add debugging"
git push
```

---

## 🔴 Performance Issues (Slow Loading)

### Frontend too slow
```bash
# 1. Check Vercel Analytics
# Vercel Dashboard → Analytics

# 2. Check asset size
# npm run build
# Should be < 500KB total

# 3. Enable caching in Vercel
# vercel.json should have cache headers
# (already configured in your vercel.json)

# 4. Check Network tab in DevTools
# Should show assets < 1s to load
```

### Backend too slow
```bash
# 1. Check Render CPU/Memory
# Render Dashboard → Metrics

# 2. Optimize database queries
# Check if queries have proper indexes

# 3. Add response caching
# Render free tier has 750 hours = ~1 month
# Should be enough for small app
```

---

## 🔴 Git Push Rejected

### Symptom
```
error: failed to push some refs to 'origin'
```

### Solution
```bash
# 1. Check what's different
git status

# 2. If files are modified
git add .
git commit -m "Your message"

# 3. Pull latest changes
git pull origin main

# 4. Try push again
git push origin main
```

---

## 🟡 Website Works Locally but Not in Production

### Checklist
- [ ] Environment variables set in Vercel/Render?
- [ ] API URL different locally vs production?
  - Locally: `http://localhost:5000`
  - Production: `https://bughive-backend.onrender.com`
- [ ] Absolute vs relative paths consistent?
- [ ] CORS configured for production domain?
- [ ] JWT_SECRET same on backend?
- [ ] MongoDB connection string correct?

### Debug in production
```bash
# 1. Open DevTools (F12)
# 2. Go to Console tab
# 3. Look for red errors

# 4. Go to Network tab
# 5. Try to login
# 6. See what requests fail

# 7. Click on failed request
# 8. Check Response tab for error message
```

---

## 🟡 "Service Unavailable" / 503 Error

### Temporary
- Render server might be restarting
- Wait 1-2 minutes and refresh
- Check Render status: https://status.render.com

### Permanent
- Free tier running out of hours?
  - Check Render Dashboard → Usage
  - Each service gets 750 hours/month
- Restart service: Render Dashboard → Restart Service

---

## ✅ Everything Works! Now What?

### Monitor regularly
```bash
# Weekly checks:
1. Verify both apps load
2. Test login/create bug flow
3. Check Render logs for errors
4. Check Vercel Analytics

# Monthly checks:
1. Update dependencies: npm update
2. Security check: npm audit
3. Performance review: Vercel Analytics
```

### Optional improvements
```bash
# Add error tracking (Sentry)
# Enable database backups
# Set up email notifications
# Configure custom domain
# Enable analytics
```

---

## 📞 Still Having Issues?

### Check these files
1. **VERCEL_DEPLOYMENT_GUIDE.md** - Full deployment guide
2. **VSCODE_TROUBLESHOOTING.md** - Development issues
3. **API_GUIDE.md** - API reference
4. **OPERATING_GUIDE.md** - System architecture

### Get help from logs
```bash
# View exact error messages
Vercel: Dashboard → Deployments → View Logs
Render: Dashboard → Logs
MongoDB: Atlas → Metrics
```

### Search the web
- Copy exact error message
- Search: "vercel [error]"
- Search: "render nodejs [error]"
- Check Stack Overflow

---

## ✨ Quick Reference

| Issue | Command | Link |
|-------|---------|------|
| Check local build | `npm run build --prefix frontend` | - |
| Check backend locally | `node backend/server.js` | - |
| Test MongoDB | `mongosh "mongodb+srv://..."` | - |
| View Vercel logs | Dashboard → Deployments → View Logs | https://vercel.com |
| View Render logs | Dashboard → Logs | https://render.com |
| Check MongoDB | Atlas → Metrics | https://mongodb.com/atlas |
| Restart backend | Render → Restart Service | https://render.com |
| Redeploy frontend | Vercel → Redeploy | https://vercel.com |

---

**Made it through troubleshooting? Great! Your app is live! 🎉**
