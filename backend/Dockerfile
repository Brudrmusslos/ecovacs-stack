FROM node:20-alpine
#ARG BASE_URL
#ARG BASE_URL_01
# Install needed tools and build dependencies
RUN apk --no-cache add \
    bash curl wget build-base g++ \
    cairo-dev jpeg-dev pango-dev giflib-dev \
    grep sudo \
    ca-certificates \
    nss \
    && update-ca-certificates

# Allow sudo for the node user
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Install mkcert and setup CA
RUN curl -s https://api.github.com/repos/FiloSottile/mkcert/releases/latest \
    | grep browser_download_url \
    | grep linux-amd64 \
    | cut -d '"' -f 4 \
    | wget -qi - \
    && mv mkcert-v*-linux-amd64 mkcert \
    && chmod +x mkcert \
    && mv mkcert /usr/local/bin/ \
    && mkcert -install \
    && cp "$(mkcert -CAROOT)/rootCA.pem" /usr/local/share/ca-certificates/mkcert-root.crt \
    && chmod 644 /usr/local/share/ca-certificates/mkcert-root.crt \
    && update-ca-certificates

ENV NODE_EXTRA_CA_CERTS="/usr/local/share/ca-certificates/mkcert-root.crt"

# Create app directory
WORKDIR /opt/app

# Copy package.json and install deps early (to leverage cache)
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

# Copy full source and generate certs
COPY --chown=node:node . .

# Create certs during build
#RUN bash ./generate_certs.sh

USER node

CMD ["yarn", "run", "dev"]
