# NewsDigest - AI-Powered News Dashboard

A modern, intelligent news aggregation and summarization platform built with React and Flask. Get personalized news with AI-powered summaries and a beautiful reading experience. **Currently runs locally only.**

![NewsSumm Dashboard](https://img.shields.io/badge/Status-Local%20Development-orange)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Summaries**: Concise summaries using Google Gemini API with intelligent fallback
- **Personalized News Feed**: Customizable categories and preferences
- **Reading Analytics**: Track daily reading habits and maintain streaks
- **Social Sharing**: Share articles with public links
- **Dark/Light Mode**: Beautiful theme switching with smooth transitions
- **Multi-Port Support**: Works on ports 3000, 3001, 3002 for flexible development

### 🔐 Authentication
- **GitHub OAuth** integration
- Secure session management
- Automatic authentication flow handling

### 💾 Smart Storage
- Browser-based storage (LocalStorage)
- Persistent reading streaks and preferences
- No database required (easily extensible)

### 🎨 Modern Design
- Apple/OpenAI inspired minimalist design
- Smooth animations with Framer Motion
- Responsive grid layouts
- Glass morphism effects
- Tailwind CSS with custom styling

### 🛡️ Robust Error Handling
- **Gemini API Quota Management**: Intelligent fallback when quota is exceeded
- **Rate Limiting**: Prevents API quota exhaustion
- **Graceful Degradation**: Always provides summaries (AI or fallback)
- **CORS Configuration**: Supports multiple local development ports

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **API Keys** (see setup guide below)

### 1. Clone the Repository
```bash
git clone https://github.com/baka-byte447.git
cd NewsSumm
```

### 2. Backend Setup
```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp config_example.py .env
# Edit .env with your API keys

# Run the backend
python app.py
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at:
- **Frontend**: http://localhost:3000 (or 3001/3002 if 3000 is busy)
- **Backend**: http://localhost:5000

### 4. Quick Restart Script (Windows)
```powershell
# Use the provided restart script for easy development
.\restart_dev.ps1
```

## 🔑 API Setup

### Required API Keys

| Service | Purpose | Cost | Setup Guide | Status |
|---------|---------|------|-------------|---------|
| **News API** | Fetch news articles | Free (1000 req/day) | [NewsAPI.org](https://newsapi.org) | ✅ Required |
| **Gemini API** | AI summarization | Free (15 req/min) | [Google AI Studio](https://makersuite.google.com/app/apikey) | ✅ Required |
| **GitHub OAuth** | User authentication | Free | [GitHub Developer Settings](https://github.com/settings/developers) | ✅ Required |
| **Google OAuth** | User authentication | Free | [Google Cloud Console](https://console.cloud.google.com/) | ⚠️ Optional |
| **Google Translate** | Language translation | $20/month | [Google Cloud Console](https://console.cloud.google.com/) | ❌ Disabled |

### Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Flask Configuration
SECRET_KEY=your-super-secret-key-here

# News API
NEWS_API_KEY=your-newsapi-key-here

# AI Services
GEMINI_API_KEY=your-gemini-api-key-here

# OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Frontend URL (for OAuth callbacks)
FRONTEND_URL=http://localhost:3000
```

## 🏗️ Architecture

### Backend (Flask)
```
backend/
├── app.py              # Main Flask application with CORS support
├── auth.py             # OAuth authentication
├── news_service.py     # News processing & AI integration with quota management
├── config.py           # Configuration management
├── requirements.txt    # Python dependencies
├── restart_dev.ps1     # Windows restart script
└── TROUBLESHOOTING_AUTH.md  # Authentication troubleshooting guide
```

### Frontend (React)
```
frontend/
├── src/
│   ├── components/     # React components
│   ├── utils/          # Utility functions (API calls)
│   └── styles/         # CSS and styling
├── package.json        # Node.js dependencies
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🛠️ Tech Stack

### Backend
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing (supports multiple ports)
- **Google Gemini API** - AI-powered text generation with quota management
- **Authlib** - OAuth 2.0 implementation
- **Requests** - HTTP library for API calls

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set
- **LocalStorage** - Client-side data persistence

## 🔧 Development Features

### Gemini API Quota Management
- **Lazy Initialization**: Model only loads when needed
- **Rate Limiting**: 1-second delay between API calls
- **Intelligent Fallback**: Uses article descriptions when quota exceeded
- **Quota Detection**: Automatically detects and handles quota limits
- **Cache System**: Reduces API calls for repeated articles

### Multi-Port Development
- **CORS Configuration**: Supports localhost:3000, 3001, 3002
- **Flexible Port Usage**: Frontend can run on any available port
- **Authentication Flow**: Works seamlessly across different ports

### Error Handling
- **Graceful Degradation**: Always provides content even if APIs fail
- **User-Friendly Messages**: Clear feedback for different error states
- **Fallback Summaries**: Article descriptions when AI is unavailable

## 📱 Screenshots

*[Add screenshots of your app here]*

![Alt Text](SS/Screenshot%202025-08-24%20190048.png)
![Alt Text](SS/Screenshot%202025-08-24%20190230.png)
![Alt Text](SS/Screenshot%202025-08-24%20190251.png)


## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
python test_news_service.py

# Frontend tests
cd frontend
npm test
```

### Health Checks
```bash
# Backend health
curl http://localhost:5000/api/health

# OAuth configuration test
curl http://localhost:5000/auth/test-oauth
```

### Troubleshooting
If you encounter authentication issues:
1. Check the [Troubleshooting Guide](TROUBLESHOOTING_AUTH.md)
2. Use the restart script: `.\restart_dev.ps1`
3. Clear browser cookies for localhost
4. Verify all environment variables are set

## 📚 API Documentation

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information and health status |
| `/api/health` | GET | Health check and service status |
| `/api/news` | GET | Fetch news articles with AI summaries |
| `/auth/login/github` | GET | GitHub OAuth login |
| `/auth/callback/github` | GET | GitHub OAuth callback |
| `/auth/user` | GET | Get current user information |
| `/auth/logout` | POST | Logout user |

### Example API Response
```json
{
  "articles": [
    {
      "id": "article-url",
      "title": "Article Title",
      "description": "Article description",
      "summary": "AI-generated summary or fallback description",
      "url": "https://article-url.com",
      "source": "News Source",
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalResults": 20,
  "category": "technology"
}
```

## 🚨 Known Issues & Limitations

### Current Limitations
- **Local Development Only**: Not deployed to production
- **Google Translate Disabled**: Translation features not working
- **In-Memory Storage**: Data not persisted between server restarts
- **Single User**: No multi-user support

### Gemini API Considerations
- **Free Tier Limits**: 15 requests/minute, 1,500 requests/day
- **Quota Management**: System automatically handles quota exceeded scenarios
- **Fallback Mode**: Uses article descriptions when AI is unavailable
- **Rate Limiting**: Built-in delays to prevent quota exhaustion

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NewsAPI.org** for providing news data
- **Google AI Studio** for Gemini AI capabilities
- **OpenAI** for design inspiration
- **React** and **Flask** communities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/baka-byte-447/NewsSummarizerDashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/baka-byte-447/NewsSummarizerDashboard/discussions)
- **Email**: milansharma2807@gmail.com

## 🔮 Future Roadmap

### Planned Features
- [ ] **Database Integration**: PostgreSQL/MongoDB for data persistence
- [ ] **User Preferences**: Save user settings and reading history
- [ ] **Advanced Analytics**: Detailed reading insights and trends
- [ ] **Mobile App**: React Native version
- [ ] **Deployment**: Production deployment on cloud platforms
- [ ] **Translation**: Fix Google Translate integration
- [ ] **Multi-User Support**: User accounts and profiles

### Technical Improvements
- [ ] **Redis Caching**: Improve performance with Redis
- [ ] **API Rate Limiting**: Better quota management
- [ ] **Testing**: Comprehensive test suite
- [ ] **CI/CD**: Automated testing and deployment
- [ ] **Monitoring**: Application performance monitoring

---

**Made with ❤️ by TEAM G-30**

*Star this repository if you found it helpful!*

> **Note**: This project is currently in local development. For production use, additional setup for deployment, database integration, and security hardening would be required.