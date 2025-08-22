from flask import Blueprint, request, jsonify, session, redirect, url_for, current_app
from authlib.integrations.flask_client import OAuth
import requests

auth_bp = Blueprint('auth', __name__)

def init_oauth(app):
    oauth = OAuth(app)
    
    google = None
    github = None
    
    # Initialize Google OAuth if credentials are available
    if app.config.get('GOOGLE_CLIENT_ID') and app.config.get('GOOGLE_CLIENT_SECRET'):
        try:
            google = oauth.register(
                name='google',
                client_id=app.config['GOOGLE_CLIENT_ID'],
                client_secret=app.config['GOOGLE_CLIENT_SECRET'],
                server_metadata_url='https://accounts.google.com/.well-known/openid_configuration',
                client_kwargs={
                    'scope': 'openid email profile'
                }
            )
            print("✓ Google OAuth configured successfully")
        except Exception as e:
            print(f"✗ Failed to configure Google OAuth: {e}")
            google = None
    else:
        print("⚠ Google OAuth not configured (missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET)")
    
    # Initialize GitHub OAuth if credentials are available
    if app.config.get('GITHUB_CLIENT_ID') and app.config.get('GITHUB_CLIENT_SECRET'):
        try:
            github = oauth.register(
                name='github',
                client_id=app.config['GITHUB_CLIENT_ID'],
                client_secret=app.config['GITHUB_CLIENT_SECRET'],
                access_token_url='https://github.com/login/oauth/access_token',
                access_token_params=None,
                authorize_url='https://github.com/login/oauth/authorize',
                authorize_params=None,
                api_base_url='https://api.github.com/',
                client_kwargs={'scope': 'user:email'},
            )
            print("✓ GitHub OAuth configured successfully")
        except Exception as e:
            print(f"✗ Failed to configure GitHub OAuth: {e}")
            github = None
    else:
        print("⚠ GitHub OAuth not configured (missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET)")
    
    return oauth, google, github

@auth_bp.route('/login/<provider>')
def login(provider):
    oauth = current_app.extensions['authlib.integrations.flask_client']
    
    if provider == 'google':
        if not oauth.google:
            return jsonify({'error': 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.'}), 500
        redirect_uri = url_for('auth.callback', provider='google', _external=True)
        return oauth.google.authorize_redirect(redirect_uri)
    elif provider == 'github':
        if not oauth.github:
            return jsonify({'error': 'GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables.'}), 500
        redirect_uri = url_for('auth.callback', provider='github', _external=True)
        return oauth.github.authorize_redirect(redirect_uri)
    else:
        return jsonify({'error': 'Invalid provider. Supported providers: google, github'}), 400

@auth_bp.route('/callback/<provider>')
def callback(provider):
    oauth = current_app.extensions['authlib.integrations.flask_client']
    try:
        if provider == 'google':
            if not oauth.google:
                return jsonify({'error': 'Google OAuth is not configured'}), 500
            token = oauth.google.authorize_access_token()
            user_info = token.get('userinfo')
            user_data = {
                'id': user_info['sub'],
                'name': user_info['name'],
                'email': user_info['email'],
                'picture': user_info.get('picture'),
                'provider': 'google'
            }
        elif provider == 'github':
            if not oauth.github:
                return jsonify({'error': 'GitHub OAuth is not configured'}), 500
            token = oauth.github.authorize_access_token()
            resp = oauth.github.get('user', token=token)
            user_info = resp.json()
            user_data = {
                'id': str(user_info['id']),
                'name': user_info.get('name', user_info['login']),
                'email': user_info.get('email'),
                'picture': user_info.get('avatar_url'),
                'provider': 'github'
            }
        else:
            return jsonify({'error': 'Invalid provider'}), 400
        
        session['user'] = user_data
        return redirect('http://localhost:3000/dashboard')
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/logout')
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logged out successfully'})

@auth_bp.route('/user')
def get_user():
    user = session.get('user')
    if user:
        return jsonify(user)
    return jsonify({'error': 'Not authenticated'}), 401





# auth.py

# from flask import Blueprint, request, jsonify, session, redirect, url_for, current_app
# from authlib.integrations.flask_client import OAuth
# from functools import wraps
# from datetime import datetime, timedelta

# # --- Robust JWT import (supports PyJWT names) ---
# try:
#     import jwt  # PyJWT
# except Exception:  # pragma: no cover
#     jwt = None

# auth_bp = Blueprint('auth', __name__)

# # -----------------------------
# # OAuth bootstrap
# # -----------------------------
# def init_oauth(app):
#     """
#     Initialize OAuth with the Flask app.
#     This function:
#       - Verifies SECRET_KEY exists (needed for session/state).
#       - Registers GitHub provider.
#       - Stores the OAuth instance in app.extensions under the same key
#         your routes are already using: 'authlib.integrations.flask_client'.
#     """
#     if not app.config.get('SECRET_KEY'):
#         raise RuntimeError(
#             "Flask SECRET_KEY is missing. Sessions won't work and OAuth state will fail."
#         )

#     oauth = OAuth(app)

#     oauth.register(
#         name='github',
#         client_id=app.config.get('GITHUB_CLIENT_ID'),
#         client_secret=app.config.get('GITHUB_CLIENT_SECRET'),
#         access_token_url='https://github.com/login/oauth/access_token',
#         authorize_url='https://github.com/login/oauth/authorize',
#         api_base_url='https://api.github.com/',
#         client_kwargs={'scope': 'user:email'},
#     )

#     # Ensure your routes can find it exactly the way you used before.
#     app.extensions['authlib.integrations.flask_client'] = oauth
#     return oauth, oauth.create_client('github')


# # -----------------------------
# # JWT helpers
# # -----------------------------
# def _ensure_jwt():
#     if not jwt:
#         raise Exception("JWT library not available. Install PyJWT: pip install PyJWT")

# def create_jwt_token(payload, secret_key):
#     _ensure_jwt()
#     # PyJWT >= 2 returns a string
#     return jwt.encode(payload, secret_key, algorithm='HS256')

# def decode_jwt_token(token, secret_key):
#     _ensure_jwt()
#     return jwt.decode(token, secret_key, algorithms=['HS256'])


# # -----------------------------
# # Auth decorator
# # -----------------------------
# def require_auth(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         token = request.headers.get('Authorization')
#         if not token:
#             return jsonify({'error': 'No token provided'}), 401

#         try:
#             if token.startswith('Bearer '):
#                 token = token[7:]
#             payload = decode_jwt_token(token, current_app.config['SECRET_KEY'])
#             # Attach user info to request context
#             request.user = payload
#         except jwt.ExpiredSignatureError:
#             return jsonify({'error': 'Token expired'}), 401
#         except jwt.InvalidTokenError:
#             return jsonify({'error': 'Invalid token'}), 401
#         except Exception as e:
#             return jsonify({'error': f'Auth error: {str(e)}'}), 401

#         return f(*args, **kwargs)
#     return decorated_function


# # -----------------------------
# # Routes
# # -----------------------------
# @auth_bp.route('/login/<provider>')
# def login(provider):
#     """
#     Initiate OAuth login.
#     Fixes:
#       - Uses the OAuth instance stored in app.extensions.
#       - Ensures a fully-qualified redirect_uri via _external=True.
#       - Relies on Authlib to generate & store CSRF 'state' in the session.
#     """
#     try:
#         oauth = current_app.extensions.get('authlib.integrations.flask_client')
#         if not oauth:
#             return jsonify({'error': 'OAuth not configured'}), 500

#         if provider != 'github':
#             return jsonify({'error': 'Unsupported provider'}), 400

#         client = oauth.create_client('github')
#         # Make session persistent across the redirect roundtrip just in case
#         session.permanent = True

#         redirect_uri = url_for('auth.callback', provider=provider, _external=True)
#         current_app.logger.debug(f"OAuth redirect_uri => {redirect_uri}")
#         return client.authorize_redirect(redirect_uri)

#     except Exception as e:
#         current_app.logger.exception("Login error")
#         return jsonify({'error': f'Login error: {str(e)}'}), 500


# @auth_bp.route('/callback/<provider>')
# def callback(provider):
#     """
#     Handle OAuth callback.
#     Fixes:
#       - Uses the same OAuth instance and client.
#       - Lets Authlib validate the 'state' against the session (prevents CSRF).
#       - Adds resilient email fetch if primary email is not present.
#       - Keeps your response/redirect contract the same.
#     """
#     try:
#         oauth = current_app.extensions.get('authlib.integrations.flask_client')
#         if not oauth:
#             return jsonify({'error': 'OAuth not configured'}), 500

#         if provider != 'github':
#             return jsonify({'error': 'Unsupported provider'}), 400

#         client = oauth.create_client('github')

#         # This call validates the OAuth 'state' in the session.
#         token = client.authorize_access_token()
#         current_app.logger.debug(f"OAuth token received: {bool(token)}")

#         # Get user info from GitHub
#         user_info = client.get('user').json()

#         # GitHub sometimes omits email in /user unless it's public; fetch emails if needed
#         email = user_info.get('email')
#         if not email:
#             try:
#                 emails = client.get('user/emails').json()
#                 primary = next((e['email'] for e in emails if e.get('primary')), None)
#                 email = primary or (emails[0]['email'] if emails else None)
#             except Exception:
#                 email = None  # keep None if we can't fetch

#         # Create JWT claims
#         payload = {
#             'user_id': user_info['id'],
#             'username': user_info['login'],
#             'email': email,
#             'avatar_url': user_info.get('avatar_url'),
#             'exp': int((datetime.utcnow() + timedelta(days=30)).timestamp())
#         }

#         jwt_token = create_jwt_token(payload, current_app.config['SECRET_KEY'])

#         # Persist minimal session (optional, but handy)
#         session['user'] = {
#             'user_id': payload['user_id'],
#             'username': payload['username'],
#             'email': payload['email'],
#             'avatar_url': payload['avatar_url'],
#         }
#         session['token'] = jwt_token

#         # Redirect to your frontend with the token (unchanged behavior)
#         frontend_url = current_app.config.get('FRONTEND_URL', 'http://localhost:3000')
#         # If you often run your frontend on a different port (e.g., 3001),
#         # make sure FRONTEND_URL is set accordingly in config/env.
#         return redirect(f"{frontend_url}/auth/success?token={jwt_token}")

#     except Exception as e:
#         current_app.logger.exception("Callback error")
#         # Preserve your error message format
#         return jsonify({'error': f'Callback error: {str(e)}'}), 500




# @auth_bp.route('/logout', methods=['POST'])
# def logout():
#     session.clear()
#     return jsonify({'message': 'Logged out successfully'})


# @auth_bp.route('/user')
# @require_auth
# def get_user():
#     return jsonify(request.user)


# @auth_bp.route('/verify', methods=['POST'])
# def verify_token():
#     try:
#         data = request.get_json(silent=True) or {}
#         token = data.get('token')

#         if not token:
#             return jsonify({'valid': False, 'error': 'No token provided'}), 400

#         payload = decode_jwt_token(token, current_app.config['SECRET_KEY'])
#         return jsonify({
#             'valid': True,
#             'user': {
#                 'user_id': payload['user_id'],
#                 'username': payload['username'],
#                 'email': payload.get('email'),
#                 'avatar_url': payload.get('avatar_url')
#             }
#         })

#     except jwt.ExpiredSignatureError:
#         return jsonify({'valid': False, 'error': 'Token expired'}), 401
#     except jwt.InvalidTokenError:
#         return jsonify({'valid': False, 'error': 'Invalid token'}), 401
#     except Exception as e:
#         return jsonify({'valid': False, 'error': str(e)}), 500

# from flask import Blueprint, request, jsonify, session, redirect, url_for, current_app
# from authlib.integrations.flask_client import OAuth
# from functools import wraps
# from datetime import datetime, timedelta
# import os

# # Try different JWT import approaches
# try:
#     import jwt
# except ImportError:
#     try:
#         import PyJWT as jwt
#     except ImportError:
#         print("Warning: JWT library not found")
#         jwt = None

# auth_bp = Blueprint('auth', __name__)

# def init_oauth(app):
#     """Initialize OAuth with the Flask app"""
#     oauth = OAuth(app)
    
#     # GitHub OAuth configuration
#     github = oauth.register(
#         name='github',
#         client_id=app.config.get('GITHUB_CLIENT_ID'),
#         client_secret=app.config.get('GITHUB_CLIENT_SECRET'),
#         access_token_url='https://github.com/login/oauth/access_token',
#         access_token_params=None,
#         authorize_url='https://github.com/login/oauth/authorize',
#         authorize_params=None,
#         api_base_url='https://api.github.com/',
#         client_kwargs={'scope': 'user:email'},
#     )
    
#     return oauth, github

# def create_jwt_token(payload, secret_key):
#     """Create JWT token with proper error handling"""
#     if not jwt:
#         raise Exception("JWT library not available")
    
#     try:
#         # Try PyJWT v2.0+ method
#         return jwt.encode(payload, secret_key, algorithm='HS256')
#     except AttributeError:
#         try:
#             # Fallback for older versions
#             import json
#             import base64
#             import hmac
#             import hashlib
            
#             # Simple JWT implementation as fallback
#             header = {"alg": "HS256", "typ": "JWT"}
#             header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
#             payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
            
#             signature = hmac.new(
#                 secret_key.encode(),
#                 f"{header_b64}.{payload_b64}".encode(),
#                 hashlib.sha256
#             ).digest()
#             signature_b64 = base64.urlsafe_b64encode(signature).decode().rstrip('=')
            
#             return f"{header_b64}.{payload_b64}.{signature_b64}"
#         except Exception as e:
#             raise Exception(f"Failed to create JWT token: {e}")

# def decode_jwt_token(token, secret_key):
#     """Decode JWT token with proper error handling"""
#     if not jwt:
#         raise Exception("JWT library not available")
    
#     return jwt.decode(token, secret_key, algorithms=['HS256'])

# def require_auth(f):
#     """Decorator to require authentication"""
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         token = request.headers.get('Authorization')
#         if not token:
#             return jsonify({'error': 'No token provided'}), 401
        
#         try:
#             if token.startswith('Bearer '):
#                 token = token[7:]
            
#             payload = decode_jwt_token(token, current_app.config['SECRET_KEY'])
#             request.user = payload
#         except jwt.ExpiredSignatureError:
#             return jsonify({'error': 'Token expired'}), 401
#         except jwt.InvalidTokenError:
#             return jsonify({'error': 'Invalid token'}), 401
#         except Exception as e:
#             return jsonify({'error': f'Auth error: {str(e)}'}), 401
        
#         return f(*args, **kwargs)
#     return decorated_function

# @auth_bp.route('/login/<provider>')
# def login(provider):
#     """Initiate OAuth login"""
#     try:
#         oauth = current_app.extensions.get('authlib.integrations.flask_client')
#         if not oauth:
#             return jsonify({'error': 'OAuth not configured'}), 500
        
#         if provider == 'github':
#             client = oauth.create_client('github')
#             redirect_uri = url_for('auth.callback', provider=provider, _external=True)
#             return client.authorize_redirect(redirect_uri)
#         else:
#             return jsonify({'error': 'Unsupported provider'}), 400
#     except Exception as e:
#         return jsonify({'error': f'Login error: {str(e)}'}), 500

# @auth_bp.route('/callback/<provider>')
# def callback(provider):
#     """Handle OAuth callback"""
#     try:
#         oauth = current_app.extensions.get('authlib.integrations.flask_client')
#         if not oauth:
#             return jsonify({'error': 'OAuth not configured'}), 500
        
#         if provider == 'github':
#             client = oauth.create_client('github')
#             token = client.authorize_access_token()
            
#             # Get user info from GitHub API
#             user_info = client.get('user', token=token).json()
            
#             # Create JWT token
#             payload = {
#                 'user_id': user_info['id'],
#                 'username': user_info['login'],
#                 'email': user_info.get('email'),
#                 'avatar_url': user_info.get('avatar_url'),
#                 'exp': int((datetime.utcnow() + timedelta(days=30)).timestamp())
#             }
            
#             jwt_token = create_jwt_token(payload, current_app.config['SECRET_KEY'])
            
#             # Store in session
#             session['user'] = payload
#             session['token'] = jwt_token
            
#             # Redirect to frontend with token
#             frontend_url = current_app.config.get('FRONTEND_URL', 'http://localhost:3000')
#             return redirect(f"{frontend_url}/auth/success?token={jwt_token}")
        
#         else:
#             return jsonify({'error': 'Unsupported provider'}), 400
            
#     except Exception as e:
#         return jsonify({'error': f'Callback error: {str(e)}'}), 500

# @auth_bp.route('/logout', methods=['POST'])
# def logout():
#     """Logout user"""
#     session.clear()
#     return jsonify({'message': 'Logged out successfully'})

# @auth_bp.route('/user')
# @require_auth
# def get_user():
#     """Get current user info"""
#     return jsonify(request.user)

# @auth_bp.route('/verify', methods=['POST'])
# def verify_token():
#     """Verify JWT token"""
#     try:
#         data = request.get_json()
#         token = data.get('token')
        
#         if not token:
#             return jsonify({'valid': False, 'error': 'No token provided'}), 400
        
#         payload = decode_jwt_token(token, current_app.config['SECRET_KEY'])
        
#         return jsonify({
#             'valid': True, 
#             'user': {
#                 'user_id': payload['user_id'],
#                 'username': payload['username'],
#                 'email': payload.get('email'),
#                 'avatar_url': payload.get('avatar_url')
#             }
#         })
        
#     except jwt.ExpiredSignatureError:
#         return jsonify({'valid': False, 'error': 'Token expired'}), 401
#     except jwt.InvalidTokenError:
#         return jsonify({'valid': False, 'error': 'Invalid token'}), 401
#     except Exception as e:
#         return jsonify({'valid': False, 'error': str(e)}), 500