"""
Django settings for "api".

- [documentation](https://docs.djangoproject.com/en/3.0/topics/settings/)
- [all available settings](https://docs.djangoproject.com/en/3.0/ref/settings/)
- [production checklist](https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/)
"""

import os


def getDockerSecret(name):
    with open(
        os.environ.get(f'DJANGO_MYSQL_{name}_FILE'),
        encoding='utf-8'
    ) as secretFile:
        return secretFile.read().strip()


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'o@_59j*gl4$qul84r^@)_*_(!f&fl8-j&(gmp#x8wi9v(t(qbc'

DEBUG = True

ALLOWED_HOSTS = [
    'api.goldeimer.lc',
    'api.goldeimer.de',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'map'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'api.urls'

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

WSGI_APPLICATION = 'api.wsgi.application'

# [password validation](https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators)
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

# [database connection](https://docs.djangoproject.com/en/3.0/ref/settings/#databases)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': getDockerSecret('DATABASE'),
        'USER': getDockerSecret('USER'),
        'PASSWORD': getDockerSecret('PASSWORD'),
        'HOST': 'db_api',
        'PORT': '3306',
    }
}

# [internationalization](https://docs.djangoproject.com/en/3.0/topics/i18n/)
LANGUAGE_CODE = 'de-de'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# [static files](https://docs.djangoproject.com/en/3.0/howto/static-files/)
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
