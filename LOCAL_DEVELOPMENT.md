# Local Development Setup

This guide will help you run the News Dashboard application locally.

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## Backend Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Environment Variables

Create a `.env` file in the `backend` directory with your API keys:

```bash
# Backend/.env
SECRET_KEY=your-secret-key-for-local-development
NEWS_API_KEY=your-news-api-key
GEMINI_API_KEY=your-gemini-api-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
FRONTEND_URL=http://localhost:3000
GOOGLE_TRANSLATE_KEY=your-google-translate-key
```

### 3. Start Backend Server

```bash
cd backend
python run_local.py
```

The backend will start at `http://localhost:5000`

## Frontend Setup

### 1. Install Node Dependencies

```bash
cd frontend
npm install
```

### 2. Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will start at `http://localhost:3000`

## GitHub OAuth Setup for Local Development

For local development, you need to update your GitHub OAuth application:

1. Go to your GitHub OAuth application settings
2. Update the **Authorization callback URL** to:
   ```
   http://localhost:5000/auth/callback/github
   ```

## API Keys Required

- **NEWS_API_KEY**: Get from [NewsAPI](https://newsapi.org/)
- **GEMINI_API_KEY**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET**: Get from [GitHub OAuth Apps](https://github.com/settings/developers)
- **GOOGLE_TRANSLATE_KEY**: Get from [Google Cloud Console](https://console.cloud.google.com/) (optional)

## Testing

1. Backend health check: `http://localhost:5000/api/health`
2. OAuth config test: `http://localhost:5000/test-oauth-config`
3. Frontend: `http://localhost:3000`

## Troubleshooting

- Make sure both backend (port 5000) and frontend (port 3000) are running
- Check that all environment variables are set correctly
- Verify GitHub OAuth callback URL is set to localhost for local development
- Check browser console for any CORS errors
