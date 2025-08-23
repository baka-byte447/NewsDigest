// API utilities for backend communication

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://newssummarizerdashboard.onrender.com'  // Update this with your actual Render backend URL
  : 'http://localhost:5000';

export const api = {
  // News endpoints
  async fetchNews(category = 'general', language = 'en', userLanguage = 'en') {
    const params = new URLSearchParams({
      category,
      language,
      userLanguage
    });
    
    const response = await fetch(`${API_BASE}/api/news?${params}`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  },

  async getArticle(articleId) {
    const response = await fetch(`${API_BASE}/api/article/${articleId}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  // Sharing
  async shareArticle(article) {
    const response = await fetch(`${API_BASE}/api/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article }),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to share article');
    return response.json();
  },

  async getSharedArticle(shareId) {
    const response = await fetch(`${API_BASE}/api/shared/${shareId}`);
    if (!response.ok) throw new Error('Failed to fetch shared article');
    return response.json();
  },

  // User & Auth
  async getUser() {
    const response = await fetch(`${API_BASE}/auth/user`, {
      credentials: 'include'
    });
    if (!response.ok) return null;
    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      credentials: 'include'
    });
    return response.json();
  },

  // Preferences
  async savePreferences(preferences) {
    const response = await fetch(`${API_BASE}/api/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to save preferences');
    return response.json();
  }
};
