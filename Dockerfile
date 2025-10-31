FROM almalinux:9

ENV APP_DIR=/var/www/app \
    NODE_MAJOR=20 \
    NEXT_PORT=3000 \
    APACHE_PORT=8080

# Install Node.js 20 and Apache (httpd)
RUN dnf -y install dnf-plugins-core && \
    dnf -y module enable nodejs:${NODE_MAJOR} && \
    dnf -y install nodejs httpd mod_ssl iproute procps-ng && \
    dnf clean all

WORKDIR ${APP_DIR}

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy app and build Next.js
COPY . .
RUN npm run build

# Configure Apache as reverse proxy on 8080 to Next.js on 3000
RUN cp /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.bak && \
    sed -i 's/^Listen 80/Listen 8080/' /etc/httpd/conf/httpd.conf && \
    printf '\n# Next.js reverse proxy on 8080 -> 3000\n' >> /etc/httpd/conf/httpd.conf && \
    printf 'LoadModule proxy_module modules/mod_proxy.so\n' >> /etc/httpd/conf/httpd.conf && \
    printf 'LoadModule proxy_http_module modules/mod_proxy_http.so\n' >> /etc/httpd/conf/httpd.conf && \
    printf '\n<VirtualHost *:8080>\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  Alias /favicon.ico /var/www/app/public/favicon.ico\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ProxyPass /favicon.ico !\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ProxyPreserveHost On\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ProxyPass / http://127.0.0.1:3000/\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ProxyPassReverse / http://127.0.0.1:3000/\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ErrorLog /var/log/httpd/error_log\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  CustomLog /var/log/httpd/access_log combined\n' >> /etc/httpd/conf/httpd.conf && \
    printf '</VirtualHost>\n' >> /etc/httpd/conf/httpd.conf

# Disable default SSL vhost; Cloud Run terminates TLS at the LB
RUN rm -f /etc/httpd/conf.d/ssl.conf

EXPOSE 8080 3000

# Entrypoint handles dev/prod mode via APP_ENV
COPY scripts/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh
ENTRYPOINT ["/usr/local/bin/start.sh"]
