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

website-dev: export NODE_ENV=development
website-dev: build-website
	docker-compose up website

docs-dev: build-docs
	docker-compose up docs

# Production build commands
prod: export NODE_ENV=production
prod: check-env
	# docker-compose run -u $(CURRENT_USER) \
	# 	-v "$(BUILD_DIR):$(BUILD_DIR)" \
	# 	-e BUILD_DIR=$(BUILD_DIR) \
	# 	website yarn build
	cp -r $(CURRENT_DIR)/website/build/* $(BUILD_DIR)
	docker-compose run -v "$(BUILD_DIR)/docs:/site" docs build

# Build commands
build-website:
	docker-compose build website

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
