# Deploying NewsSumm to Render

This guide will walk you through deploying your Flask backend to Render.

## Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. Your Flask application code
3. Environment variables for your API keys

## Step 1: Prepare Your Repository

Make sure your backend folder contains:
- `app.py` - Main Flask application
- `requirements.txt` - Python dependencies
- `wsgi.py` - WSGI entry point
- `build.sh` - Build script
- All other necessary Python files

## Step 2: Create a New Web Service on Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:

### Basic Settings
- **Name**: `newssumm-backend` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

### Build & Deploy Settings
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn wsgi:app`
- **Root Directory**: `backend` (since your Flask app is in the backend folder)

## Step 3: Set Environment Variables

In your Render service dashboard, go to "Environment" tab and add:

```
SECRET_KEY=your-secure-secret-key-here
NEWS_API_KEY=your-news-api-key
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
GOOGLE_TRANSLATE_KEY=your-google-translate-api-key
```

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for the build to complete (usually 2-5 minutes)

## Step 5: Update Frontend Configuration

After deployment, update your frontend API configuration to use the new Render URL:

```javascript
// In frontend/src/utils/api.js
const API_BASE_URL = 'https://your-app-name.onrender.com';
```

## Step 6: Update CORS Origins

In your deployed Flask app, update the CORS origins to include your frontend domain:

```python
CORS(app, supports_credentials=True, origins=[
    'http://localhost:3000',  # Local development
    'https://newssummarizerdashboard.onrender.com'  # Your frontend URL
])
```

## Step 7: Test Your Deployment

1. Visit your Render service URL
2. Test the health check endpoint: `/api/health`
3. Test your news API endpoint: `/api/news`

## Troubleshooting

### Common Issues

1. **Build Failures**: Check the build logs in Render dashboard
2. **Import Errors**: Ensure all dependencies are in `requirements.txt`
3. **Environment Variables**: Verify all required env vars are set
4. **Port Issues**: Render automatically sets the PORT environment variable

### Logs

- View build logs in the "Logs" tab
- View runtime logs in the "Logs" tab after deployment

## Security Considerations

1. **Never commit API keys** to your repository
2. Use environment variables for all sensitive data
3. Enable HTTPS (Render does this automatically)
4. Consider adding rate limiting for production

## Scaling

- Render automatically scales based on traffic
- You can manually adjust instance size in the dashboard
- Consider upgrading to a paid plan for production workloads

## Monitoring

- Use Render's built-in monitoring dashboard
- Set up alerts for downtime
- Monitor response times and error rates

## Next Steps

1. Deploy your frontend to Render or another hosting service
2. Set up a custom domain if desired
3. Configure CI/CD for automatic deployments
4. Set up monitoring and alerting
5. Consider adding a database for persistent storage

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- Check your service logs for specific error messages
