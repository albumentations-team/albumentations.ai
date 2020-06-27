SHELL := /bin/bash

PORT = 3000
MKDOCS_PORT = 8000
PROD_SITE = https://albumentations.ai
CURRENT_USER := $(shell id -u):$(shell id -g)

export PORT

.PHONY: dev prod fetch-data build-builder build-browser-sync build-images check-env-github-token

dev: build-images
	MKDOCS_PORT=${MKDOCS_PORT} PORT=${PORT} docker-compose up

mkdocs-dev: build-mkdocs
	MKDOCS_PORT=${MKDOCS_PORT} docker-compose up mkdocs

fetch-data: check-env-github-token build-builder
	docker-compose run builder fetch-data

prod: check-env-github-token build-builder fetch-data
	docker-compose run -u $(CURRENT_USER) -v ${PROD_BUILD_DIR}:${PROD_BUILD_DIR} -e BUILD_DIR=$(PROD_BUILD_DIR) builder build --base-url $(PROD_SITE)
	docker-compose run -v ${PROD_BUILD_DIR}/docs:/site mkdocs build

build-builder:
	docker-compose build --build-arg BUILDKIT_INLINE_CACHE=1 builder

build-browser-sync:
	docker-compose build --build-arg BUILDKIT_INLINE_CACHE=1 browser_sync

build-mkdocs:
	docker-compose build mkdocs

build-images: build-builder build-browser-sync build-mkdocs

check-env-github-token:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is undefined)
endif
