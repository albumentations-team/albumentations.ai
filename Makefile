SHELL := /bin/bash

CURRENT_DIR := $(shell pwd)
BUILD_DIR := $(CURRENT_DIR)/_build
WORKSPACE_DIR := $(CURRENT_DIR)

PORT = 3000
MKDOCS_PORT = 8000
PROD_SITE = https://albumentations.ai
CURRENT_USER := $(shell id -u):$(shell id -g)

export PORT
export MKDOCS_PORT
export NODE_ENV
export WORKSPACE_DIR

.PHONY: dev prod build-website build-docs build-all check-env clean

# Development commands
dev: export NODE_ENV=development
dev: build-all
	docker-compose up -V website docs

docs-dev: export NODE_ENV=development
docs-dev:
	docker-compose up docs

# Production build commands
prod: export NODE_ENV=production
prod: check-env build-all

build-website:
	@if [ -z "$$GITHUB_TOKEN" ]; then \
		echo "Error: GITHUB_TOKEN is not set"; \
		exit 1; \
	fi
	# Build website container
	docker-compose build website
	# Extract build artifacts
	mkdir -p $(BUILD_DIR)
	docker create --name temp_website albumentationsai-website
	docker cp temp_website:/website/build/. $(BUILD_DIR)/
	docker rm temp_website

build-docs:
	@echo "Building docs container..."
	docker-compose build docs
	@if [ "$(NODE_ENV)" = "production" ]; then \
		echo "Creating build directory at $(BUILD_DIR)/docs"; \
		mkdir -p $(BUILD_DIR)/docs; \
		echo "Creating temporary container..."; \
		docker create --name temp_docs albumentationsai-docs; \
		echo "Copying files from container..."; \
		docker cp temp_docs:/workspace/docs/src/site/. $(BUILD_DIR)/docs/; \
		echo "Removing temporary container..."; \
		docker rm temp_docs; \
		echo "Files in $(BUILD_DIR)/docs:"; \
		ls -la $(BUILD_DIR)/docs; \
	fi

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
	rm -rf docs/src/site
	rm -rf $(BUILD_DIR)
	docker-compose down -v
	docker volume rm -f albumentations_docs_cache || true

# Helper commands
logs:
	docker-compose logs -f

ps:
	docker-compose ps

restart:
	docker-compose restart

stop:
	docker-compose stop

# Development helpers
setup:
	cd docs && ./scripts/setup.sh

download-notebooks:
	cd docs && ./scripts/download_notebooks.sh

build-local:
	cd docs && ./scripts/build.sh
