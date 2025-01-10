import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-secret-key')  # Default fallback
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', 5000)  # Default to port 5000
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Handle missing DATABASE_URL or incorrect format
    db_url = os.environ.get('DATABASE_URL')
    if db_url and db_url.startswith('postgres://'):
        db_url = db_url.replace('postgres://', 'postgresql://')

    SQLALCHEMY_DATABASE_URI = db_url or 'sqlite:///default.db'  # Fallback to SQLite if not provided
    SQLALCHEMY_ECHO = os.environ.get('SQLALCHEMY_ECHO', 'False').lower() == 'true'

    # Debug mode
    DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'

