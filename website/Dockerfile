FROM node:20-slim

WORKDIR /website

# Set environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV} \
    BUILD_DIR=${BUILD_DIR} \
    HOME=/home/node

# Copy configuration files first
COPY website/package.json website/yarn.lock ./

# Copy the rest of the application
COPY website .

# Second install after copying all files with cleanup
RUN npm --force install

# Expose port
EXPOSE 3000

# Set the command
CMD if [ "$NODE_ENV" = "production" ]; then \
        npm run build; \
    else \
        npm run dev; \
    fi
