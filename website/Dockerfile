FROM node:20-alpine AS deps
WORKDIR /website
COPY website/package.json website/yarn.lock ./
RUN yarn install

FROM node:20-alpine AS builder
WORKDIR /website

# Add build arguments
ARG GOOGLE_ANALYTICS_ID
ARG GITHUB_TOKEN

# Set them as environment variables for the build
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$GOOGLE_ANALYTICS_ID \
    GITHUB_TOKEN=$GITHUB_TOKEN \
    NODE_ENV=production

COPY --from=deps /website/node_modules ./node_modules
COPY website .

# Add verbose output to debug the build
RUN set -x && \
    echo "Starting build..." && \
    yarn build --debug && \
    echo "Build complete. Contents of current directory:" && \
    ls -la && \
    echo "Contents of build directory:" && \
    ls -la build || true && \
    echo "Contents of .next directory:" && \
    ls -la .next || true && \
    echo "Contents of out directory:" && \
    ls -la out || true
