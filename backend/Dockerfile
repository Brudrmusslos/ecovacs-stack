FROM node:20-alpine

RUN apk --no-cache add \
    bash curl wget build-base g++ \
    cairo-dev jpeg-dev pango-dev giflib-dev \
    grep sudo \
    ca-certificates \
    nss \
    && update-ca-certificates

RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Install mkcert
RUN curl -s https://api.github.com/repos/FiloSottile/mkcert/releases/latest \
    | grep browser_download_url \
    | grep linux-amd64 \
    | cut -d '"' -f 4 \
    | wget -qi - \
    && mv mkcert-v*-linux-amd64 mkcert \
    && chmod +x mkcert \
    && mv mkcert /usr/local/bin/

# Install CA certs system-wide
RUN mkcert -install \
    && cp "$(mkcert -CAROOT)/rootCA.pem" /usr/local/share/ca-certificates/mkcert-root.crt \
    && chmod 644 /usr/local/share/ca-certificates/mkcert-root.crt \
    && update-ca-certificates

# Optional but safe: export again
ENV NODE_EXTRA_CA_CERTS="/usr/local/share/ca-certificates/mkcert-root.crt"

USER node
WORKDIR /opt/app
