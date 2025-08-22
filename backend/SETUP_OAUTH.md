# Setting Up GitHub OAuth for NewsSumm

## Prerequisites
- A GitHub account
- Python 3.7+ installed
- Flask backend running

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the following details:
   - **Application name**: `NewsSumm` (or any name you prefer)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:5000/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret** (you'll need these in the next step)

## Step 2: Configure Environment Variables

You have several options to set the GitHub OAuth credentials:

### Option A: Set Environment Variables (Recommended for development)

**Windows PowerShell:**
```powershell
$env:GITHUB_CLIENT_ID="your-client-id-here"
$env:GITHUB_CLIENT_SECRET="your-client-secret-here"
$env:SECRET_KEY="your-secret-key-here"
```

**Windows Command Prompt:**
```cmd
set GITHUB_CLIENT_ID=your-client-id-here
set GITHUB_CLIENT_SECRET=your-client-secret-here
set SECRET_KEY=your-secret-key-here
```

**Linux/Mac:**
```bash
export GITHUB_CLIENT_ID="your-client-id-here"
export GITHUB_CLIENT_SECRET="your-client-secret-here"
export SECRET_KEY="your-secret-key-here"
```

### Option B: Create a .env file

Create a `.env` file in the `backend` directory:
```env
GITHUB_CLIENT_ID=your-client-id-here
GITHUB_CLIENT_SECRET=your-client-secret-here
SECRET_KEY=your-secret-key-here
```

**Note**: Make sure `.env` is not in your `.gitignore` file, or create a `.env.local` file instead.

### Option C: Modify config.py directly (Not recommended for production)

Edit `backend/config.py` and replace the environment variable calls with your actual values:
```python
GITHUB_CLIENT_ID = 'your-actual-client-id'
GITHUB_CLIENT_SECRET = 'your-actual-client-secret'
```

## Step 3: Restart the Backend

After setting the environment variables, restart your Flask backend:

```bash
cd backend
python app.py
```

You should see:
```
✓ GitHub OAuth configured successfully
```

## Step 4: Test the Login

1. Start your frontend: `cd frontend && npm start`
2. Go to `http://localhost:3000`
3. Click "Continue with GitHub"
4. You should be redirected to GitHub for authorization
5. After authorizing, you'll be redirected back to the dashboard

## Troubleshooting

### "GitHub OAuth is not configured" Error
- Make sure you've set the environment variables correctly
- Restart the backend after setting environment variables
- Check that the variable names are exactly `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

### "Invalid redirect URI" Error
- Make sure the callback URL in your GitHub OAuth app is exactly: `http://localhost:5000/auth/callback/github`
- Check that your backend is running on port 5000

### "Client ID not found" Error
- Verify that your GitHub OAuth app is properly registered
- Double-check the Client ID and Client Secret values

### Environment Variables Not Loading
- Make sure you're setting them in the same terminal session where you run the backend
- Try using a `.env` file instead
- Check that `python-dotenv` is installed: `pip install python-dotenv`

## Security Notes

- Never commit your OAuth credentials to version control
- Use environment variables or `.env` files (excluded from git)
- In production, use proper secret management services
- The `SECRET_KEY` should be a strong, random string

## Additional Configuration

You can also configure Google OAuth by setting:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

And other API keys:
- `NEWS_API_KEY` - for news fetching
- `GEMINI_API_KEY` - for AI summarization
- `GOOGLE_TRANSLATE_KEY` - for translation features
