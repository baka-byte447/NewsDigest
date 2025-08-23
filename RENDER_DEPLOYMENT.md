# Render Backend Deployment Guide

This guide will help you deploy your News Dashboard backend to Render and integrate it with your Vercel frontend.

## 🚀 Quick Setup

### 1. Prerequisites
- Render account
- All API keys configured
- GitHub repository with your code

### 2. Deploy to Render

#### Option A: Deploy via Render UI
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `newssummarizerdashboard` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Root Directory**: `backend` (if your backend is in a subdirectory)

#### Option B: Deploy via Render CLI
```bash
# Install Render CLI
npm install -g @render/cli

# Navigate to backend directory
cd backend

# Login to Render
render login

# Deploy
render deploy
```

## 🔧 Environment Variables

Set these environment variables in your Render dashboard:

### Required Variables
```bash
SECRET_KEY=your-super-secure-production-key
NEWS_API_KEY=your-news-api-key
GEMINI_API_KEY=your-gemini-api-key
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
FRONTEND_URL=https://news-summarizer-dashboard-swlg.vercel.app
```

### Optional Variables
```bash
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_TRANSLATE_KEY=your-google-translate-key
```

## 🔗 GitHub OAuth Configuration

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App or edit existing one
3. Set the following URLs:
   - **Homepage URL**: `https://news-summarizer-dashboard-swlg.vercel.app`
   - **Authorization callback URL**: `https://newssummarizerdashboard-1.onrender.com/auth/callback/github`

## 🔄 Frontend Configuration

Your frontend API configuration in `frontend/src/utils/api.js` should already be correct:

```javascript
const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://newssummarizerdashboard-1.onrender.com'  // Render backend URL
  : 'http://localhost:5000';
```

## 📁 Project Structure

Your Render project structure should look like:

```
backend/
├── app.py              # Main Flask application
├── auth.py             # Auth logic
├── config.py           # Configuration
├── news_service.py     # News service
├── requirements.txt    # Python dependencies
└── wsgi.py            # WSGI entry point
```

## 🧪 Testing Your Deployment

### 1. Test API Health
```bash
curl https://newssummarizerdashboard-1.onrender.com/api/health
```

### 2. Test News API
```bash
curl "https://newssummarizerdashboard-1.onrender.com/api/news?category=technology"
```

### 3. Test OAuth Flow
1. Visit: `https://newssummarizerdashboard-1.onrender.com/auth/login/github`
2. Complete GitHub authorization
3. Should redirect to your Vercel frontend with user data

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Failures
- Check that all dependencies are in `requirements.txt`
- Verify Python version compatibility
- Check build logs in Render dashboard

#### 2. CORS Issues
- Ensure CORS configuration includes your Vercel domain
- Check that credentials are properly configured

#### 3. OAuth Redirect Issues
- Verify callback URLs in GitHub OAuth settings
- Ensure `FRONTEND_URL` environment variable is set correctly

#### 4. Environment Variable Issues
- Check that all required environment variables are set
- Verify API keys are valid and have sufficient quotas

### Debugging

#### Check Application Logs
```bash
# View logs in Render dashboard
# Go to your service → Logs tab
```

#### Test Locally
```bash
# Test locally before deploying
cd backend
pip install -r requirements.txt
python app.py
```

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit sensitive data to your repository
- Use Render's environment variable management
- Rotate keys regularly

### 2. CORS Configuration
- Only allow necessary origins
- Use specific domains instead of wildcards

### 3. OAuth Security
- Use HTTPS for all OAuth callbacks
- Validate OAuth state parameters
- Implement proper session management

## 📊 Monitoring

### 1. Render Analytics
- Monitor application performance
- Track response times
- Set up alerts for errors

### 2. Custom Monitoring
- Add logging to your application
- Monitor API response times
- Track OAuth success/failure rates

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v1.0.0
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

## 🎯 Performance Optimization

### 1. Application Optimization
- Use connection pooling for external APIs
- Implement caching where possible
- Optimize database queries

### 2. Render-Specific Optimization
- Use appropriate instance types
- Enable auto-scaling if needed
- Monitor resource usage

## 📞 Support

If you encounter issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review [Render documentation](https://render.com/docs)
3. Check application logs in Render dashboard
4. Verify environment variable configuration
5. Test OAuth callback URLs

## 🎉 Success Checklist

- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] GitHub OAuth callback URL updated
- [ ] Frontend API URL updated
- [ ] Health check endpoint working
- [ ] News API responding
- [ ] OAuth flow working
- [ ] CORS properly configured
- [ ] Application responding within acceptable time limits

---

**Happy Deploying! 🚀**
