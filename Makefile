SHELL := /bin/bash

PORT = 3000
MKDOCS_PORT = 8000
PROD_SITE = https://albumentations.ai
CURRENT_USER := $(shell id -u):$(shell id -g)

export PORT

.PHONY: dev prod fetch-data build-builder build-browser-sync build-images check-env-github-token

dev: build-images
	MKDOCS_PORT=${MKDOCS_PORT} PORT=${PORT} docker-compose up -V

mkdocs-dev: build-mkdocs
	GOOGLE_ANALYTICS_ID=${GOOGLE_ANALYTICS_ID} MKDOCS_PORT=${MKDOCS_PORT} docker-compose up -V mkdocs

site-dev: build-builder build-browser-sync
	GOOGLE_ANALYTICS_ID=${GOOGLE_ANALYTICS_ID} docker-compose up builder browser_sync

fetch-data: check-env-github-token build-builder
	docker-compose run builder fetch-data

prod: check-env-github-token check-env-google-analytics-id fetch-data build-builder build-mkdocs
	GOOGLE_ANALYTICS_ID=${GOOGLE_ANALYTICS_ID} docker-compose run -u $(CURRENT_USER) -v ${PROD_BUILD_DIR}:${PROD_BUILD_DIR} -e BUILD_DIR=$(PROD_BUILD_DIR) builder build --base-url $(PROD_SITE)
	GOOGLE_ANALYTICS_ID=${GOOGLE_ANALYTICS_ID} docker-compose run -v ${PROD_BUILD_DIR}/docs:/site mkdocs build

build-builder:
	docker-compose build builder

build-browser-sync:
	docker-compose build browser_sync

build-mkdocs:
	docker-compose build mkdocs

build-images: build-builder build-browser-sync build-mkdocs

check-env-github-token:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is undefined)
endif

check-env-google-analytics-id:
ifndef GOOGLE_ANALYTICS_ID
	$(error GOOGLE_ANALYTICS_ID is undefined)
endif
