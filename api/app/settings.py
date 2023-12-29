from pathlib import Path
import mongoengine
from datetime import timedelta
from rest_framework.settings import api_settings
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'o%pp6@f!9u$q^mfkkbr4)a_*ddj5tlwlohz@z=g99#&tct)8ob'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

STATIC_URL = '/static/'
STATIC_ROOT = '/app/staticfiles/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'knox',
    'orders',
    'personalInfo',
    'cars',
    'core',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',),
}

CSRF_HEADER_NAME = "X-CSRFTOKEN"

REST_KNOX = {
  'SECURE_HASH_ALGORITHM': 'cryptography.hazmat.primitives.hashes.SHA512',
  'AUTH_TOKEN_CHARACTER_LENGTH': 64,
  'TOKEN_TTL': timedelta(hours=10),
  'USER_SERIALIZER': 'knox.serializers.UserSerializer',
  'TOKEN_LIMIT_PER_USER': None,
  'AUTO_REFRESH': False,
  'EXPIRY_DATETIME_FORMAT': api_settings.DATETIME_FORMAT,
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'

DATABASES = {
    "default": {
        'NAME': 'autohub365',
        'ENGINE': 'django.db.backends.postgresql',
        'USER': 'user',
        'PASSWORD': 'pass',
        'HOST': "postgres",
        'PORT': '5432',
    },
}

MONGODB_DATABASES = {
    'mongo': {
        'NAME': 'autohub365',
        'HOST': 'mongodb',
        'PORT': 27017,
    },
}

CONNECTION_STRING = "mongodb://user:pass@mongodb:27017/autohub365?authMechanism=DEFAULT"

mongoengine.connect(host=CONNECTION_STRING, authentication_source='admin')

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
