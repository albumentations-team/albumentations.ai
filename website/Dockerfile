FROM node:20-slim

WORKDIR /website

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY ./website/package.json ./

# Install dependencies
RUN yarn install

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PATH /website/node_modules/.bin:$PATH

# We'll mount everything at runtime
EXPOSE 3000

# Use yarn commands directly
ENTRYPOINT ["yarn"]
CMD ["run", "dev"]
