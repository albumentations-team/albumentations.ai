FROM node:20-alpine AS deps
WORKDIR /website
COPY website/package.json website/yarn.lock ./
RUN yarn install

FROM node:20-alpine AS builder
WORKDIR /website

# Add build arguments
ARG GOOGLE_ANALYTICS_ID
ARG GITHUB_TOKEN
ARG GITHUB_PAGES


# Set them as environment variables for the build
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$GOOGLE_ANALYTICS_ID \
    GITHUB_TOKEN=$GITHUB_TOKEN \
    NODE_ENV=production \
    GITHUB_PAGES=$GITHUB_PAGES

# Copy only necessary files
COPY --from=deps /website/node_modules ./node_modules
COPY website/src ./src
COPY website/public ./public
COPY website/next.config.ts ./
COPY website/postcss.config.mjs ./
COPY website/tailwind.config.ts ./
COPY website/tsconfig.json ./
COPY website/package.json ./
COPY website/yarn.lock ./

# Build and verify output
RUN set -x && \
    echo "Starting build..." && \
    yarn build && \
    echo "Build complete. Verifying output..." && \
    # Ensure all necessary files are present
    test -d build/_next && \
    test -f build/index.html && \
    # Copy static assets to maintain relative paths
    cp -r build/_next build/static && \
    # List contents for verification
    echo "Contents of build directory:" && \
    ls -la build && \
    echo "Contents of static assets:" && \
    ls -la build/static
