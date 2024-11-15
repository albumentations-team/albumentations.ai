FROM node:20-slim

# Create app directory and set permissions
RUN mkdir -p /website /home/node/.cache/node/corepack && \
    chown -R node:node /website /home/node/.cache

# Switch to non-root user
USER node

WORKDIR /website

# Set environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_DIR=${BUILD_DIR}

# Copy package files with correct ownership
COPY website/package.json website/yarn.lock ./

# Setup Yarn
RUN corepack enable
RUN yarn set version 4.5.1

# Copy the rest of the application
COPY website .

# Install dependencies
RUN yarn install

# Expose port
EXPOSE 3000

# Set the command
CMD if [ "$NODE_ENV" = "production" ]; then \
        yarn build; \
    else \
        yarn dev; \
    fi
