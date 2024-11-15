SHELL := /bin/bash

CURRENT_DIR := $(shell pwd)
BUILD_DIR := $(CURRENT_DIR)/_build

PORT = 3000
MKDOCS_PORT = 8000
PROD_SITE = https://albumentations.ai
CURRENT_USER := $(shell id -u):$(shell id -g)


export PORT
export MKDOCS_PORT
export NODE_ENV

.PHONY: dev prod build-website build-docs build-all check-env

# Development commands
dev: export NODE_ENV=development
dev: build-all
	docker-compose up -V website docs

docs-dev: build-docs
	docker-compose up docs

# Production build commands
prod: export NODE_ENV=production
prod: check-env
	docker-compose build website
	cp -r website/build/* $(BUILD_DIR)

build-website:
	@if [ -z "$$GITHUB_TOKEN" ]; then \
		echo "Error: GITHUB_TOKEN is not set"; \
		exit 1; \
	fi
	# First build the container
	docker-compose build website
	# Create a temporary container
	docker create --name temp_website albumentationsai-website
	# Ensure the local build directory exists
	mkdir -p website/build
	# Copy the build files from the container
	docker cp temp_website:/website/build/. website/build/
	# Clean up
	docker rm temp_website
	# copy the build to the build directory
	mkdir -p $(BUILD_DIR)
	cp -r website/build/* $(BUILD_DIR)

build-docs:
	docker-compose build docs

build-all: build-website build-docs

# Environment checks
check-env: check-env-github-token check-env-google-analytics-id

check-env-github-token:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is undefined)
endif

check-env-google-analytics-id:
ifndef GOOGLE_ANALYTICS_ID
	$(error GOOGLE_ANALYTICS_ID is undefined)
endif

# Clean up
clean:
	rm -rf website/.next
	rm -rf docs/site
	rm -rf $(PROD_BUILD_DIR)
	docker-compose down -v

# Helper commands
logs:
	docker-compose logs -f

ps:
	docker-compose ps

restart:
	docker-compose restart

stop:
	docker-compose stop
