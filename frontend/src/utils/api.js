// API utilities for backend communication

// const API_BASE = process.env.NODE_ENV === 'production' 
//   ? 'https://newssummarizerdashboard.onrender.com'  // Update this with your actual Render backend URL
//   : 'http://localhost:5000';

// export const api = {
//   // News endpoints
//   async fetchNews(category = 'general', language = 'en', userLanguage = 'en') {
//     const params = new URLSearchParams({
//       category,
//       language,
//       userLanguage
//     });
    
//     const response = await fetch(`${API_BASE}/api/news?${params}`);
//     if (!response.ok) throw new Error('Failed to fetch news');
//     return response.json();
//   },

//   async getArticle(articleId) {
//     const response = await fetch(`${API_BASE}/api/article/${articleId}`);
//     if (!response.ok) throw new Error('Failed to fetch article');
//     return response.json();
//   },

//   // Sharing
//   async shareArticle(article) {
//     const response = await fetch(`${API_BASE}/api/share`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ article }),
//       credentials: 'include'
//     });
//     if (!response.ok) throw new Error('Failed to share article');
//     return response.json();
//   },

//   async getSharedArticle(shareId) {
//     const response = await fetch(`${API_BASE}/api/shared/${shareId}`);
//     if (!response.ok) throw new Error('Failed to fetch shared article');
//     return response.json();
//   },

//   // User & Auth
//   async getUser() {
//     const response = await fetch(`${API_BASE}/auth/user`, {
//       credentials: 'include'
//     });
//     if (!response.ok) return null;
//     return response.json();
//   },

//   async logout() {
//     const response = await fetch(`${API_BASE}/auth/logout`, {
//       credentials: 'include'
//     });
//     return response.json();
//   },

//   // Preferences
//   async savePreferences(preferences) {
//     const response = await fetch(`${API_BASE}/api/preferences`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(preferences),
//       credentials: 'include'
//     });
//     if (!response.ok) throw new Error('Failed to save preferences');
//     return response.json();
//   }
// };







// API utilities for backend communication
// const API_BASE = 'http://localhost:5000';






// // Fixed getUser function in utils/api.js
// async function getUser() {
//   try {
//     const response = await fetch(`${API_BASE}/auth/user`, {
//       credentials: 'include'
//     });
    
//     if (response.ok) {
//       const userData = await response.json();
//       console.log('✅ User authenticated:', userData); // Debug log
//       return userData;
//     } else if (response.status === 401) {
//       console.log('❌ User not authenticated (401)'); // Debug log
//       return null;
//     } else {
//       console.error('❌ Unexpected response status:', response.status);
//       return null;
//     }
//   } catch (error) {
//     console.error('❌ Network error checking auth:', error);
//     return null;
//   }
// }



// export const api = {
//   // News endpoints
//   async fetchNews(category = 'general', language = 'en', userLanguage = 'en') {
//     const params = new URLSearchParams({ category, language, userLanguage });
//     const response = await fetch(`${API_BASE}/api/news?${params}`, {
//       credentials: 'include'
//     });
//     if (!response.ok) throw new Error('Failed to fetch news');
//     return response.json();
//   },

//   async getArticle(articleId) {
//     const response = await fetch(`${API_BASE}/api/article/${articleId}`, {
//       credentials: 'include'
//     });
//     if (!response.ok) throw new Error('Failed to fetch article');
//     return response.json();
//   },

//   // Sharing
//   async shareArticle(article) {
//     const response = await fetch(`${API_BASE}/api/share`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ article }),
//       credentials: 'include'
//     });
//     if (!response.ok) throw new Error('Failed to share article');
//     return response.json();
//   },

//   async getSharedArticle(shareId) {
//     const response = await fetch(`${API_BASE}/api/shared/${shareId}`, {
//       credentials: 'include'
//     });
//     if (!response.ok) throw new Error('Failed to fetch shared article');
//     return response.json();
//   },

//   // User & Auth
//   async getUser() {
//     const response = await fetch(`${API_BASE}/auth/user`, {
//       credentials: 'include'
//     });
//     if (!response.ok) return null;
//     return response.json();
//   },

//   async logout() {
//     const response = await fetch(`${API_BASE}/auth/logout`, {
//       credentials: 'include'
//     });
//     return response.json();
//   },

//   // Preferences
//   async savePreferences(preferences) {
//     const response = await fetch(`${API_BASE}/api/preferences`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(preferences),
//       credentials: 'include'
//     });
//     if (!response.ok) throw new Error('Failed to save preferences');
//     return response.json();
//   }
// };















const API_BASE = 'http://localhost:5000';  // Local development only

const api = {
  // News endpoints
  async fetchNews(category = 'general', language = 'en', userLanguage = 'en') {
    const params = new URLSearchParams({ category, language, userLanguage });
    const response = await fetch(`${API_BASE}/api/news?${params}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  },

  async getArticle(articleId) {
    const response = await fetch(`${API_BASE}/api/article/${articleId}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  // Sharing
  async shareArticle(article) {
    const response = await fetch(`${API_BASE}/api/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article }),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to share article');
    return response.json();
  },

  async getSharedArticle(shareId) {
    const response = await fetch(`${API_BASE}/api/shared/${shareId}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch shared article');
    return response.json();
  },

  // User & Auth - Fixed getUser function
  async getUser() {
    try {
      const response = await fetch(`${API_BASE}/auth/user`, {
        credentials: 'include'
      });
     
      if (response.ok) {
        const userData = await response.json();
        console.log('✅ User authenticated:', userData);
        return userData;
      } else if (response.status === 401) {
        console.log('❌ User not authenticated (401)');
        return null;
      } else {
        console.error('❌ Unexpected response status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('❌ Network error checking auth:', error);
      return null;
    }
  },

  async logout() {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST', // Usually logout should be POST
      credentials: 'include'
    });
    return response.json();
  },

  // Preferences
  async savePreferences(preferences) {
    const response = await fetch(`${API_BASE}/api/preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to save preferences');
    return response.json();
  }
};

// Export as default (to match your import in App.js)
export default api;