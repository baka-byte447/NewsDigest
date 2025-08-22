// Local storage utilities for preferences, streaks, and reading data

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'news_user_preferences',
  READING_STREAK: 'news_reading_streak',
  DAILY_READS: 'news_daily_reads',
  SAVED_ARTICLES: 'news_saved_articles',
  ARTICLE_VOTES: 'news_article_votes'
};

export const defaultPreferences = {
  categories: ['technology', 'science'],
  language: 'en',
  updateFrequency: 'daily',
  theme: 'light'
};

// Preferences
export const savePreferences = (preferences) => {
  localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
};

export const getPreferences = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
  return stored ? JSON.parse(stored) : defaultPreferences;
};

// Reading Streaks
export const updateReadingStreak = () => {
  const today = new Date().toDateString();
  const streakData = getReadingStreak();
  
  if (streakData.lastReadDate === today) {
    // Already read today
    return streakData;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  if (streakData.lastReadDate === yesterdayStr) {
    // Continue streak
    streakData.streak += 1;
  } else if (streakData.lastReadDate !== today) {
    // Streak broken, start new
    streakData.streak = 1;
  }
  
  streakData.lastReadDate = today;
  localStorage.setItem(STORAGE_KEYS.READING_STREAK, JSON.stringify(streakData));
  
  return streakData;
};

export const getReadingStreak = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.READING_STREAK);
  return stored ? JSON.parse(stored) : { streak: 0, lastReadDate: null };
};

// Daily Reads Counter
export const incrementDailyReads = () => {
  const today = new Date().toDateString();
  const dailyReads = getDailyReads();
  
  if (dailyReads.date !== today) {
    dailyReads.date = today;
    dailyReads.count = 1;
  } else {
    dailyReads.count += 1;
  }
  
  localStorage.setItem(STORAGE_KEYS.DAILY_READS, JSON.stringify(dailyReads));
  return dailyReads.count;
};

export const getDailyReads = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.DAILY_READS);
  const today = new Date().toDateString();
  const defaultData = { date: today, count: 0 };
  
  if (!stored) return defaultData;
  
  const data = JSON.parse(stored);
  return data.date === today ? data : defaultData;
};

// Saved Articles
export const saveArticle = (article) => {
  const saved = getSavedArticles();
  const exists = saved.find(a => a.id === article.id);
  
  if (!exists) {
    saved.push({ ...article, savedAt: Date.now() });
    localStorage.setItem(STORAGE_KEYS.SAVED_ARTICLES, JSON.stringify(saved));
  }
  
  return saved;
};

export const removeSavedArticle = (articleId) => {
  const saved = getSavedArticles();
  const filtered = saved.filter(a => a.id !== articleId);
  localStorage.setItem(STORAGE_KEYS.SAVED_ARTICLES, JSON.stringify(filtered));
  return filtered;
};

export const getSavedArticles = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.SAVED_ARTICLES);
  return stored ? JSON.parse(stored) : [];
};

// Article Votes
export const voteArticle = (articleId, vote) => {
  const votes = getArticleVotes();
  votes[articleId] = vote;
  localStorage.setItem(STORAGE_KEYS.ARTICLE_VOTES, JSON.stringify(votes));
  return votes;
};

export const getArticleVotes = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.ARTICLE_VOTES);
  return stored ? JSON.parse(stored) : {};
};

export const getArticleVote = (articleId) => {
  const votes = getArticleVotes();
  return votes[articleId] || null;
};
