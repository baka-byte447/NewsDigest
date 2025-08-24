#!/usr/bin/env python3
"""
Local development server for News Dashboard Backend
"""
import os
from app import app

if __name__ == '__main__':
    # Set default environment variables for local development
    os.environ.setdefault('SECRET_KEY', 'dev-secret-key-change-in-production')
    os.environ.setdefault('FRONTEND_URL', 'http://localhost:3000')
    
    print("🚀 Starting News Dashboard Backend (Local Development)")
    print("📍 Backend URL: http://localhost:5000")
    print("🌐 Frontend URL: http://localhost:3000")
    print("📝 Make sure to set your API keys in environment variables:")
    print("   - NEWS_API_KEY")
    print("   - GEMINI_API_KEY") 
    print("   - GITHUB_CLIENT_ID")
    print("   - GITHUB_CLIENT_SECRET")
    print("   - GOOGLE_TRANSLATE_KEY (optional)")
    print("\n" + "="*50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)