


# Settings for devel server
import os
from os import path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = True
TEMPLATE_DEBUG = DEBUG
#ROOT_PATH = os.path.join(os.path.dirname(__file__), '..')
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

#STATIC_ROOT = path.join(ROOT_PATH, 'static').replace('\\', '/')
#STATIC_ROOT = '/var/djangoprojects/caeproy/caeproy/static/'

#MEDIA_ROOT = os.path.join(ROOT_PATH, 'media')
#MEDIA_URL = 'http://127.0.0.1:8000/media/'
MEDIA_URL = '/site_media/'
#ADMIN_MEDIA_PREFIX = '/media/admin/'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
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



#define your backend authentification

'''
AUTH_PROFILE_MODULE = 'gestion.perfil'

AUTHENTICATION_BACKENDS = (
    'gestion.ldapbe.LDAPBackend',
    'django.contrib.auth.backends.ModelBackend',
)


##LDAP CONFIG##########################
AD_DNS_NAME = '172.16.0.13'
AD_DNS_NAME_POWER_CAMPUS = '172.16.0.16'
AD_LDAP_PORT = 389

AD_SEARCH_DN = 'ou=people, dc=unach, dc=cl'

AD_SEARCH_DN_ALU = 'ou=people, dc=alu, dc=unach, dc=cl'

AD_SEARCH_DN_POWER_CAMPUS = 'ou=PowerCampus, dc=unach2, dc=cl'

AD_SEARCH_FIELDS = ['mail','givenName','sn']

AD_LDAP_URL = 'ldap://%s:%s' % (AD_DNS_NAME,AD_LDAP_PORT)
AD_LDAP_URL_POWER_CAMPUS = 'ldap://%s:%s' % (AD_DNS_NAME_POWER_CAMPUS,AD_LDAP_PORT)
#####################################################################################
'''