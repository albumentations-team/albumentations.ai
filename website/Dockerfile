FROM node:20-slim

# Create app directory and set permissions
RUN mkdir -p /website /home/node/.cache/node/corepack && \
    chown -R node:node /website /home/node/.cache

# Enable corepack before switching to non-root user
RUN corepack enable

# Switch to non-root user
USER node

WORKDIR /website

# Set environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_DIR=${BUILD_DIR}
ENV YARN_CACHE_FOLDER=/home/node/.cache/yarn
ENV PATH /website/node_modules/.bin:$PATH

# Copy package files with correct ownership
COPY --chown=node:node website/package.json website/yarn.lock ./

# Setup Yarn
RUN yarn set version 4.5.1

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY --chown=node:node website .

# Expose port
EXPOSE 3000

# Set the command
CMD if [ "$NODE_ENV" = "production" ]; then \
        yarn dlx next build; \
    else \
        yarn dlx next dev; \
    fi
