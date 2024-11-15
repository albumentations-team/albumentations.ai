FROM node:20-slim

WORKDIR /website

# Set environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_DIR=${BUILD_DIR}

# Copy package files
COPY website/package.json website/yarn.lock ./

RUN yarn install

# Copy the rest of the application
COPY website .

# Build the application if in production
EXPOSE 3000

CMD yarn dev
