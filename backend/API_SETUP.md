# API Setup Guide for NewsSumm

## Overview
NewsSumm requires several API keys to provide full functionality. This guide will help you set up each service.

## Required API Keys

### 1. News API Key (Required for News)
**Service**: [NewsAPI.org](https://newsapi.org)
**Purpose**: Fetch news articles from various sources
**Cost**: Free tier available (1000 requests/day)

**Setup Steps**:
1. Go to [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for a free account
4. Copy your API key

**Environment Variable**:
```bash
export NEWS_API_KEY="your-news-api-key-here"
```

### 2. Gemini API Key (Required for AI Summarization)
**Service**: [Google AI Studio](https://makersuite.google.com/app/apikey)
**Purpose**: AI-powered article summarization
**Cost**: Free tier available (15 requests/minute)

**Setup Steps**:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

**Environment Variable**:
```bash
export GEMINI_API_KEY="your-gemini-api-key-here"
```

### 3. Google Translate API Key (Optional)
**Service**: [Google Cloud Console](https://console.cloud.google.com/)
**Purpose**: Translate articles to different languages
**Cost**: $20/month for 500,000 characters

**Setup Steps**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Cloud Translation API
4. Create credentials (API key)
5. Copy your API key

**Environment Variable**:
```bash
export GOOGLE_TRANSLATE_KEY="your-google-translate-key-here"
```

## Setting Environment Variables

### Windows PowerShell
```powershell
$env:NEWS_API_KEY="your-news-api-key-here"
$env:GEMINI_API_KEY="your-gemini-api-key-here"
$env:GOOGLE_TRANSLATE_KEY="your-google-translate-key-here"
```

### Windows Command Prompt
```cmd
set NEWS_API_KEY=your-news-api-key-here
set GEMINI_API_KEY=your-gemini-api-key-here
set GOOGLE_TRANSLATE_KEY=your-google-translate-key-here
```

### Linux/Mac
```bash
export NEWS_API_KEY="your-news-api-key-here"
export GEMINI_API_KEY="your-gemini-api-key-here"
export GOOGLE_TRANSLATE_KEY="your-google-translate-key-here"
```

## Testing Your Setup

### 1. Test News Service
```bash
cd backend
python test_news_service.py
```

### 2. Test News Endpoint
```bash
curl http://localhost:5000/api/news
```

### 3. Check Health Endpoint
```bash
curl http://localhost:5000/api/health
```

## Feature Availability by API Key

| Feature | Requires | Status |
|---------|----------|---------|
| News Articles | NEWS_API_KEY | ✅ Required |
| AI Summarization | GEMINI_API_KEY | ✅ Required |
| Translation | GOOGLE_TRANSLATE_KEY | ⚠️ Optional |
| GitHub OAuth | GITHUB_CLIENT_ID + SECRET | ✅ Required |
| Google OAuth | GOOGLE_CLIENT_ID + SECRET | ⚠️ Optional |

## Troubleshooting

### "News API key not provided" Error
- Make sure you've set the `NEWS_API_KEY` environment variable
- Restart your backend after setting the variable
- Check that the variable name is exactly `NEWS_API_KEY`

### "Gemini API key not provided" Error
- Make sure you've set the `GEMINI_API_KEY` environment variable
- Verify your Gemini API key is valid
- Check that you have quota remaining

### "Google Translate not available" Error
- This is normal if you don't have the Google Translate API key
- Translation features will be disabled but won't break the app

### News Not Loading
- Check that your News API key is valid
- Verify you haven't exceeded your daily quota
- Check the backend logs for specific error messages

### AI Summarization Not Working
- Verify your Gemini API key is correct
- Check that you haven't exceeded your rate limits
- Ensure the `google-generativeai` package is installed

## Package Installation

If you encounter import errors, install the required packages:

```bash
pip install google-generativeai
pip install google-cloud-translate
```

## Security Notes

- Never commit API keys to version control
- Use environment variables or `.env` files
- In production, use proper secret management services
- Monitor your API usage to avoid unexpected charges

## Cost Optimization

- **News API**: Free tier (1000 requests/day) is sufficient for development
- **Gemini**: Free tier (15 requests/minute) is generous for testing
- **Google Translate**: Only enable if you need translation features
- Monitor usage in your respective dashboards

## Next Steps

1. Set up your API keys
2. Test the news service
3. Start your frontend and backend
4. Enjoy your personalized news dashboard!
