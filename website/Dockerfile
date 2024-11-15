FROM node:20-slim

WORKDIR /website

# Set environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV} \
    BUILD_DIR=${BUILD_DIR} \
    GITHUB_TOKEN=${GITHUB_TOKEN}

# Copy configuration files first
COPY website/package.json ./

# Copy the rest of the application
COPY website .

# Second install after copying all files with cleanup
RUN npm --force install

# Expose port
EXPOSE 3000

CMD npm run dev
