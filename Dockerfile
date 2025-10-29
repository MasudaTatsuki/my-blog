# AlmaLinux + Apache + Node.js(20) + Next.js SSR
FROM almalinux:9

ENV APP_DIR=/var/www/app \
    NODE_MAJOR=20 \
    NEXT_PORT=3000 \
    APACHE_PORT=8080

# Node.js 20 & Apache(httpd)
RUN dnf -y install dnf-plugins-core && \
    dnf -y module enable nodejs:${NODE_MAJOR} && \
    dnf -y install nodejs httpd mod_ssl && \
    dnf clean all

WORKDIR ${APP_DIR}

# 依存だけ先に入れてレイヤー最適化
COPY package*.json ./
RUN npm install

# アプリ本体をコピー & ビルド
COPY . .
# Next.jsはSSRで動かす（next start）
RUN npm run build

# Apache（httpd）をリバプロとして設定：:8080 → Node(Next) :3000
# Cloud Run はコンテナの $PORT をリッスンする必要があるため、Apacheを 8080 で待ち受け
# 元のhttpd.confをバックアップしてから、必要な設定を追加
RUN cp /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.bak && \
    sed -i 's/^Listen 80/Listen 8080/' /etc/httpd/conf/httpd.conf &&  \
    printf '\n# Next.js proxy settings\n' >> /etc/httpd/conf/httpd.conf && \
    printf 'LoadModule proxy_module modules/mod_proxy.so\n' >> /etc/httpd/conf/httpd.conf && \
    printf 'LoadModule proxy_http_module modules/mod_proxy_http.so\n' >> /etc/httpd/conf/httpd.conf && \
    printf '\n<VirtualHost *:8080>\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ProxyPreserveHost On\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ProxyPass / http://127.0.0.1:3000/\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ProxyPassReverse / http://127.0.0.1:3000/\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  ErrorLog /var/log/httpd/error_log\n' >> /etc/httpd/conf/httpd.conf && \
    printf '  CustomLog /var/log/httpd/access_log combined\n' >> /etc/httpd/conf/httpd.conf && \
    printf '</VirtualHost>\n' >> /etc/httpd/conf/httpd.conf

# 80/443 は使わず 8080 を公開（Cloud Run に合わせる）
RUN rm -f /etc/httpd/conf.d/ssl.conf
EXPOSE 8080

# Node(Next.js) をバックグラウンドで起動 → Apache をフォアグラウンドで維持
# Cloud Run では単一コンテナ内での "&" 起動でOK（systemd不可）
CMD sh -c "PORT=${NEXT_PORT} npm start & exec /usr/sbin/httpd -D FOREGROUND"
