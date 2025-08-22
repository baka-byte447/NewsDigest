import requests
import json
from datetime import datetime
from typing import List, Dict, Optional

# Try to import Gemini AI
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    print("Warning: google-generativeai not installed. AI summarization will be disabled.")
    GEMINI_AVAILABLE = False

# Try to import Google Translate
try:
    from google.cloud import translate
    TRANSLATE_AVAILABLE = True
except ImportError:
    print("Warning: google-cloud-translate not installed. Translation will be disabled.")
    TRANSLATE_AVAILABLE = False

class NewsService:
    def __init__(self, news_api_key: str, gemini_api_key: str, google_translate_key: Optional[str] = None):
        self.news_api_key = news_api_key
        self.gemini_api_key = gemini_api_key
        self.google_translate_key = google_translate_key
        
        # Configure Gemini AI if available and API key provided
        self.gemini_model = None
        if GEMINI_AVAILABLE and gemini_api_key:
            try:
                genai.configure(api_key=gemini_api_key)
                
                # List available models for debugging
                try:
                    models = genai.list_models()
                    print(f"Available Gemini models: {[m.name for m in models if 'gemini' in m.name.lower()]}")
                except Exception as e:
                    print(f"Could not list models: {e}")
                
                # Try different model names for compatibility
                try:
                    self.gemini_model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
                    print("✓ Gemini AI initialized successfully with gemini-1.5-pro-latest")
                except:
                    try:
                        self.gemini_model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
                        print("✓ Gemini AI initialized successfully with gemini-1.5-flash-latest")
                    except:
                        try:
                            self.gemini_model = genai.GenerativeModel('models/gemini-1.5-pro')
                            print("✓ Gemini AI initialized successfully with gemini-1.5-pro")
                        except:
                            try:
                                self.gemini_model = genai.GenerativeModel('models/gemini-1.5-flash')
                                print("✓ Gemini AI initialized successfully with gemini-1.5-flash")
                            except Exception as e:
                                print(f"✗ All Gemini models failed: {e}")
                                self.gemini_model = None
            except Exception as e:
                print(f"✗ Failed to initialize Gemini AI: {e}")
                self.gemini_model = None
        else:
            if not GEMINI_AVAILABLE:
                print("⚠ Gemini AI not available (package not installed)")
            elif not gemini_api_key:
                print("⚠ Gemini API key not provided - AI summarization disabled")
        
        # Initialize Google Translate client only if available and credentials provided
        self.translate_client = None
        if TRANSLATE_AVAILABLE and google_translate_key:
            try:
                # Try the correct import method for google-cloud-translate
                if hasattr(translate, 'Client'):
                    self.translate_client = translate.Client()
                else:
                    # Fallback for newer versions
                    self.translate_client = translate.TranslationServiceClient()
                print("✓ Google Translate initialized successfully")
            except Exception as e:
                print(f"✗ Failed to initialize Google Translate: {e}")
                print("Translation features will be disabled")
        else:
            if not TRANSLATE_AVAILABLE:
                print("⚠ Google Translate not available (package not installed)")
            elif not google_translate_key:
                print("⚠ Google Translate key not provided - translation features disabled")
    
    def fetch_news(self, query: str = None, category: str = None, language: str = 'en', page_size: int = 20) -> Dict:
        """Fetch news from News API"""
        base_url = "https://newsapi.org/v2"
        
        if query:
            url = f"{base_url}/everything"
            params = {
                'q': query,
                'apiKey': self.news_api_key,
                'language': language,
                'sortBy': 'publishedAt',
                'pageSize': page_size
            }
        else:
            url = f"{base_url}/top-headlines"
            params = {
                'apiKey': self.news_api_key,
                'language': language,
                'pageSize': page_size
            }
            if category and category.lower() != 'all':
                params['category'] = category.lower()
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching news: {e}")
            return {"status": "error", "message": str(e)}
    
    def summarize_article(self, title: str, description: str, content: str) -> str:
        """Summarize an article using Gemini AI"""
        if not self.gemini_model:
            # Fallback: create a simple summary from available text
            if description and len(description) > 50:
                # Take first 100 characters and add ellipsis
                return description[:100] + "..." if len(description) > 100 else description
            elif title:
                return f"Article about: {title}"
            else:
                return "Summary unavailable"
        
        try:
            # Combine available text
            article_text = f"Title: {title}\n"
            if description:
                article_text += f"Description: {description}\n"
            if content and content != "[Removed]":
                article_text += f"Content: {content}"
            
            prompt = f"""
            Please provide a concise summary of this news article in 2-3 sentences:
            
            {article_text}
            
            Focus on the key facts and main points.
            """
            
            response = self.gemini_model.generate_content(prompt)
            return response.text.strip()
        
        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg or "quota" in error_msg.lower() or "rate" in error_msg.lower():
                print(f"Rate limit/quota exceeded for Gemini API: {e}")
                return f"AI summary temporarily unavailable (rate limit). Original description: {description}"
            else:
                print(f"Error summarizing article: {e}")
            
            # Fallback to simple summary
            if description and len(description) > 50:
                return description[:100] + "..." if len(description) > 100 else description
            elif title:
                return f"Article about: {title}"
            else:
                return "Summary unavailable"
    
    def translate_text(self, text: str, target_language: str = 'en') -> str:
        """Translate text using Google Translate (if available)"""
        if not self.translate_client:
            return text  # Return original text if translation not available
            
        try:
            # Handle different client types
            if hasattr(self.translate_client, 'translate'):
                # Old client
                result = self.translate_client.translate(text, target_language=target_language)
                return result['translatedText']
            else:
                # New client - would need different implementation
                print("New Google Translate client not fully implemented")
                return text
        except Exception as e:
            print(f"Translation error: {e}")
            return text
    
    def process_news_data(self, news_data: Dict, summarize: bool = True, translate_to: str = None) -> Dict:
        """Process and enhance news data"""
        if news_data.get('status') == 'error':
            return news_data
        
        articles = news_data.get('articles', [])
        processed_articles = []
        
        for article in articles:
            processed_article = {
                'id': article.get('url', ''),  # Use URL as ID for now
                'title': article.get('title', ''),
                'description': article.get('description', ''),
                'url': article.get('url', ''),
                'urlToImage': article.get('urlToImage'),
                'publishedAt': article.get('publishedAt'),
                'source': article.get('source', {}).get('name', 'Unknown'),
                'content': article.get('content', ''),
                'originalLanguage': 'en'  # Default to English, will be updated if translation is applied
            }
            
            # Add summary if requested
            if summarize and processed_article['title']:
                processed_article['summary'] = self.summarize_article(
                    processed_article['title'],
                    processed_article['description'],
                    processed_article['content']
                )
            
            # Add translation if requested and available
            if translate_to and self.translate_client and translate_to != 'en':
                processed_article['translated_title'] = self.translate_text(
                    processed_article['title'], translate_to
                )
                processed_article['translatedDescription'] = self.translate_text(
                    processed_article['description'], translate_to
                )
                if processed_article.get('summary'):
                    processed_article['translated_summary'] = self.translate_text(
                        processed_article['summary'], translate_to
                    )
                # Mark that this article was translated from English
                processed_article['originalLanguage'] = 'en'
            
            processed_articles.append(processed_article)
        
        return {
            'status': 'ok',
            'totalResults': news_data.get('totalResults', len(processed_articles)),
            'articles': processed_articles
        }