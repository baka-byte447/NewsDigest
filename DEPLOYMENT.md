# Deployment Guide

This guide covers deploying NewsSumm to various platforms and environments.

## 🚀 Quick Deploy

### Prerequisites
- All API keys configured
- Environment variables set
- Tests passing locally
- Code committed and pushed

## 🌐 Platform Options

### 1. Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

#### Backend (Railway)
```bash
cd backend
railway login
railway init
railway up
```

### 2. Netlify (Frontend) + Heroku (Backend)

#### Frontend (Netlify)
```bash
cd frontend
npm run build
# Drag and drop build/ folder to Netlify
```

#### Backend (Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### 3. AWS (Full Stack)

#### Using AWS Amplify
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

## 🔧 Environment Configuration

### Production Environment Variables

Create a `.env.production` file:

```env
# Flask Configuration
FLASK_ENV=production
SECRET_KEY=your-super-secure-production-key

# API Keys
NEWS_API_KEY=your-newsapi-key
GEMINI_API_KEY=your-gemini-key
GOOGLE_TRANSLATE_KEY=your-translate-key

# OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Production URLs
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

### OAuth Redirect URLs

Update your OAuth app settings:

```
GitHub OAuth:
- Homepage URL: https://yourdomain.com
- Authorization callback URL: https://api.yourdomain.com/auth/callback/github

Google OAuth:
- Authorized JavaScript origins: https://yourdomain.com
- Authorized redirect URIs: https://api.yourdomain.com/auth/callback/google
```

## 🐳 Docker Deployment

### Dockerfile (Backend)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

### Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    env_file:
      - .env.production

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
```

## 🔒 SSL/HTTPS Setup

### Let's Encrypt (Free)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Custom SSL Certificate
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
}
```

## 📊 Monitoring & Logging

### Health Checks
```bash
# Backend health
curl https://api.yourdomain.com/api/health

# Frontend status
curl -I https://yourdomain.com
```

### Log Monitoring
```bash
# Backend logs
heroku logs --tail  # Heroku
railway logs        # Railway
docker logs container_name  # Docker

# Frontend monitoring
# Use Vercel Analytics, Netlify Analytics, or Google Analytics
```

## 🚨 Troubleshooting

### Common Issues

#### CORS Errors
```python
# Update CORS configuration in backend/app.py
CORS(app, supports_credentials=True, origins=[
    'https://yourdomain.com',
    'https://www.yourdomain.com'
])
```

#### OAuth Redirect Issues
- Verify redirect URLs in OAuth app settings
- Check environment variables
- Ensure HTTPS is used in production

#### API Key Issues
- Verify all API keys are set
- Check API quotas and limits
- Test API endpoints individually

### Performance Optimization

#### Backend
```python
# Add caching
from flask_caching import Cache

cache = Cache(config={'CACHE_TYPE': 'simple'})
cache.init_app(app)

# Cache news data
@cache.memoize(timeout=300)
def get_cached_news():
    return fetch_news()
```

#### Frontend
```javascript
// Add service worker for caching
// Enable code splitting
// Optimize bundle size
```

## 📈 Scaling

### Horizontal Scaling
- Use load balancers
- Implement database clustering
- Add CDN for static assets

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching layers

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] OAuth redirect URLs updated
- [ ] SSL certificates ready
- [ ] Domain DNS configured
- [ ] Backup strategy in place

### Post-Deployment
- [ ] Health checks passing
- [ ] OAuth flows working
- [ ] News API responding
- [ ] Gemini API working
- [ ] Frontend loading correctly
- [ ] Monitoring alerts configured

### Maintenance
- [ ] Regular security updates
- [ ] Performance monitoring
- [ ] Error log review
- [ ] Backup verification
- [ ] SSL certificate renewal

---

## 🆘 Support

If you encounter deployment issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review platform-specific documentation
3. Open a [GitHub issue](https://github.com/yourusername/NewsSumm/issues)
4. Check the [deployment logs](#-monitoring--logging)

**Happy Deploying! 🚀**
