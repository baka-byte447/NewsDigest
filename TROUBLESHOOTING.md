# Troubleshooting Guide

## 🚨 Current Issues

### 1. Vercel Dashboard Not Showing URL
**Problem**: Vercel dashboard doesn't show the main URL
**Solution**: 
1. Go to https://vercel.com/dashboard
2. Find your project
3. Check if deployment is successful
4. If not, redeploy by pushing to your GitHub repository

### 2. OAuth Redirect URI Errors
**Problem**: "The `redirect_uri` is not associated with this application"
**Solution**: 
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Find your OAuth app and click "Edit"
3. Set **Authorization callback URL** to exactly:
   ```
   https://newssummarizerdashboard-1.onrender.com/auth/callback/github
   ```
4. Set **Homepage URL** to your Vercel frontend URL
5. Click "Update application"

## 🔧 Quick Fixes

### Step 1: Test Your Backend
Visit this URL to check your OAuth configuration:
```
https://newssummarizerdashboard-1.onrender.com/auth/test-oauth
```

### Step 2: Check Your Vercel Frontend
1. Go to your Vercel dashboard
2. Find your project URL
3. Visit the URL to make sure it's working

### Step 3: Update Environment Variables
Make sure these are set in your Render dashboard:
```bash
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
SECRET_KEY=your-secret-key
NEWS_API_KEY=your-news-api-key
GEMINI_API_KEY=your-gemini-api-key
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
```

## 🎯 Next Steps

1. **Redeploy your frontend** to Vercel (push to GitHub)
2. **Update GitHub OAuth settings** with the correct callback URL
3. **Test the OAuth flow** by visiting your frontend and clicking "Login with GitHub"

## 📞 Need Help?

If you're still having issues:
1. Check the test endpoint above
2. Share the output with me
3. I'll help you fix the specific configuration issues
