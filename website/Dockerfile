FROM node:20-slim

WORKDIR /website

# Copy package files
COPY website/package.json website/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY website .

EXPOSE 3000

CMD ["yarn", "dev"]
