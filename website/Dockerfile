FROM node:20-slim

# Create app directory and cache directories with correct permissions
RUN mkdir -p /website /home/node/.cache/node/corepack/v1 && \
    chown -R node:node /website /home/node/.cache && \
    chmod -R 755 /home/node/.cache

# Remove system yarn and enable corepack as root
USER root
RUN rm -rf /usr/local/bin/yarn && \
    corepack enable && \
    corepack prepare yarn@4.5.1 --activate

# Switch to non-root user
USER node

WORKDIR /website

# Set environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_DIR=${BUILD_DIR}
ENV YARN_CACHE_FOLDER=/home/node/.cache/yarn
ENV COREPACK_HOME=/home/node/.cache/node/corepack

# Copy configuration files first
COPY --chown=node:node website/.yarnrc.yml ./
COPY --chown=node:node website/package.json website/yarn.lock ./

# Install dependencies using Yarn 4
RUN corepack yarn install

# Copy the rest of the application
COPY --chown=node:node website .

# Run another install to ensure everything is linked properly
RUN corepack yarn install

# Expose port
EXPOSE 3000

# Set the command
CMD if [ "$NODE_ENV" = "production" ]; then \
        yarn build; \
    else \
        yarn dev; \
    fi
