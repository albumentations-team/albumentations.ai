SHELL := /bin/bash

CURRENT_DIR := $(shell pwd)
PROD_BUILD_DIR := $(CURRENT_DIR)/_build

PORT = 3000
MKDOCS_PORT = 8000
PROD_SITE = https://albumentations.ai
CURRENT_USER := $(shell id -u):$(shell id -g)
PROD_BUILD_DIR = _build

export PORT
export MKDOCS_PORT

.PHONY: dev prod build-website build-docs build-all check-env

# Development commands
dev: build-all
	docker-compose up -V website docs

website-dev: build-website
	cd website && yarn install
	docker-compose up website

docs-dev: build-docs
	docker-compose up docs

# Production build commands
prod: check-env build-all
	docker-compose run -u $(CURRENT_USER) \
		-v "$(PROD_BUILD_DIR):/_build" \
		-e BUILD_DIR=/_build \
		website yarn build
	docker-compose run -v "$(PROD_BUILD_DIR)/docs:/site" docs build

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
