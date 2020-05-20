FROM python:3.7-slim

ARG APP_USER=appuser
RUN groupadd -r ${APP_USER} && useradd --no-log-init -r -g ${APP_USER} ${APP_USER}

RUN seq 1 8 | xargs -I{} mkdir -p /usr/share/man/man{} \
    && apt-get update \
    && apt-get install -y \
        apt-utils

RUN apt-get install -y \
    apache2 \
    apache2-utils \
    curl \
    default-libmysqlclient-dev \
    libapache2-mod-wsgi-py3 \
    mime-support \
    mariadb-client-10.3

ENV APACHE_DOC_ROOT /var/www/html

# Enable Apache modules
RUN a2enmod rewrite
RUN a2enmod ssl

RUN apt-get install -y build-essential \
        libpcre3-dev \
        libpq-dev

COPY ./pip-requirements.api.txt /requirements.txt

RUN pip install --no-cache-dir -r /requirements.txt
    # && apt-get purge -y --auto-remove -o \
    #    APT::AutoRemove::RecommendsImportant=false $BUILD_DEPS
    # && rm -rf /var/lib/apt/lists/*

COPY ./000-api.apache.conf /etc/apache2/sites-available/000-default.conf

ENTRYPOINT ["sh", "docker-entrypoint.sh"]

# USER ${APP_USER}:${APP_USER}

CMD ["apache2ctl", "-D", "FOREGROUND"]
