FROM node:20-slim

# Create all necessary directories with correct permissions as root
USER root
RUN mkdir -p /website/node_modules /home/node/.cache/node/corepack/v1 /home/node/.yarn && \
    chown -R node:node /website /home/node/.cache /home/node/.yarn && \
    chmod -R 755 /website /home/node/.cache /home/node/.yarn

# Remove system yarn and enable corepack
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
ENV HOME=/home/node

# Copy configuration files first
COPY --chown=node:node website/.yarnrc.yml ./
COPY --chown=node:node website/package.json website/yarn.lock ./

# Install dependencies
RUN corepack yarn install

# Copy the rest of the application
COPY --chown=node:node website .

# Install dependencies again after copying all files
RUN corepack yarn install

# Expose port
EXPOSE 3000

# Set the command
CMD if [ "$NODE_ENV" = "production" ]; then \
        yarn build; \
    else \
        yarn dev; \
    fi
