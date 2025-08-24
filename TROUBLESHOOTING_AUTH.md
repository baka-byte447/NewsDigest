# Authentication Troubleshooting Guide

## Issue: Authentication Fails After Port Change

### Problem
When your frontend restarts and switches to a different port (e.g., from 3000 to 3001), authentication fails because:
1. Backend CORS only allows specific ports
2. OAuth callback URLs expect specific ports
3. Session cookies may be tied to specific ports

### Solution

#### 1. Updated CORS Configuration ✅
The backend now supports multiple local development ports:
- `http://localhost:3000`
- `http://localhost:3001` 
- `http://localhost:3002`

#### 2. Updated Frontend API Configuration ✅
The frontend now uses environment-based API URLs:
- Development: `http://localhost:5000`
- Production: `https://newssummarizerdashboard-1.onrender.com`

#### 3. Quick Fix Steps

**Option A: Use the Restart Script**
```powershell
# Run the PowerShell restart script
.\restart_dev.ps1
```

**Option B: Manual Restart**
1. Stop all development servers
2. Clear browser cookies for localhost
3. Start backend first: `cd backend && python app.py`
4. Start frontend: `cd frontend && npm start`

**Option C: Force Port 3000**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /f /pid <PID>

# Then start frontend normally
cd frontend
npm start
```

### Testing Authentication

#### 1. Check Backend Health
```bash
curl http://localhost:5000/api/health
```

#### 2. Test OAuth Configuration
Visit: `http://localhost:5000/auth/test-oauth`

Expected response:
```json
{
  "github_configured": true,
  "github_client_id": "your-client-id",
  "frontend_url": "http://localhost:3000",
  "secret_key_configured": true
}
```

#### 3. Test OAuth Flow
1. Visit: `http://localhost:5000/auth/login/github`
2. Complete GitHub authorization
3. Should redirect to your frontend with user data

### Common Issues & Solutions

#### Issue: "CORS error" in browser console
**Solution**: Ensure backend is running and CORS is properly configured

#### Issue: "OAuth callback URL mismatch"
**Solution**: Check GitHub OAuth app settings match your backend URL

#### Issue: "Session not found" after login
**Solution**: Clear browser cookies and try again

#### Issue: Frontend can't connect to backend
**Solution**: 
1. Verify backend is running on port 5000
2. Check firewall settings
3. Try accessing `http://localhost:5000/api/health` directly

### Environment Variables Check

Ensure these are set in your backend `.env` file:
```bash
SECRET_KEY=your-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
FRONTEND_URL=http://localhost:3000
```

### Debug Commands

```powershell
# Check what's running on ports
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill specific process
taskkill /f /pid <PID>

# Check backend logs
cd backend
python app.py

# Check frontend logs
cd frontend
npm start
```

### Prevention

1. **Use the restart script** to ensure proper startup order
2. **Always start backend first**, then frontend
3. **Clear browser cookies** if authentication issues persist
4. **Check console logs** for specific error messages

### Still Having Issues?

1. Check the browser's Network tab for failed requests
2. Check browser's Console tab for JavaScript errors
3. Check backend terminal for Python errors
4. Verify all environment variables are set correctly
5. Try accessing the backend directly to isolate frontend vs backend issues
