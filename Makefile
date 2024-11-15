SHELL := /bin/bash

CURRENT_DIR := $(shell pwd)
BUILD_DIR ?= $(CURRENT_DIR)/_build  # Use ?= for default value
WORKSPACE_DIR := $(CURRENT_DIR)

PORT = 3000
MKDOCS_PORT = 8000
PROD_SITE = https://albumentations.ai
CURRENT_USER := $(shell id -u):$(shell id -g)

export PORT
export MKDOCS_PORT
export NODE_ENV
export WORKSPACE_DIR
export BUILD_DIR

.PHONY: dev prod build-website build-docs build-all check-env clean

# Development commands
dev: export NODE_ENV=development
dev: build-all
	docker compose up -V website docs

docs-dev: export NODE_ENV=development
docs-dev:
	docker compose up docs

# Production build commands
prod: export NODE_ENV=production
prod: check-env build-all

build-website: check-env
	@echo "Using BUILD_DIR: $(BUILD_DIR)"
	# Clean up any existing temporary container
	docker rm temp_website 2>/dev/null || true
	# Build website container
	docker compose build website
	# Extract build artifacts
	@mkdir -p "$(BUILD_DIR)"
	docker create --name temp_website albumentationsai-website
	docker cp "temp_website:/website/build/." "$(BUILD_DIR)/"
	# Ensure proper permissions
	chmod -R 755 "$(BUILD_DIR)"
	# Clean up
	docker rm temp_website

build-docs:
	@echo "Building docs container..."
	@echo "Using BUILD_DIR: $(BUILD_DIR)"
	# Clean up any existing temporary container
	docker rm temp_docs 2>/dev/null || true
	# Build docs container
	docker compose build docs
	@if [ "$(NODE_ENV)" = "production" ]; then \
		mkdir -p "$(BUILD_DIR)/docs" && \
		docker create --name temp_docs albumentationsai-docs && \
		docker cp "temp_docs:/workspace/docs/src/site/." "$(BUILD_DIR)/docs/" && \
		docker rm temp_docs && \
		ls -la "$(BUILD_DIR)/docs"; \
	fi

# Define build-all to explicitly depend on both targets
.PHONY: build-all
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
	rm -rf "$(BUILD_DIR)"
	docker compose down -v
	docker rm temp_website temp_docs 2>/dev/null || true
	docker volume rm -f albumentations_docs_cache || true

# Helper commands
logs:
	docker compose logs -f

ps:
	docker compose ps

restart:
	docker compose restart

stop:
	docker compose stop

# Development helpers
setup:
	cd docs && ./scripts/setup.sh

download-notebooks:
	cd docs && ./scripts/download_notebooks.sh

build-local:
	cd docs && ./scripts/build.sh
