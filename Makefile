SHELL := /bin/bash

PORT = 3000
PROD_SITE = https://albumentations.ai
CURRENT_USER := $(shell id -u):$(shell id -g)

export PORT

.PHONY: dev prod fetch-data build-builder build-browser-sync build-images check-env-github-token

dev: build-images
	PORT=${PORT} docker-compose up

fetch-data: check-env-github-token build-builder
	docker-compose run builder fetch-data

prod: check-env-github-token build-builder fetch-data
	docker-compose run -u $(CURRENT_USER) -v ${PROD_BUILD_DIR}:${PROD_BUILD_DIR} -e BUILD_DIR=$(PROD_BUILD_DIR) builder build --base-url $(PROD_SITE)

build-builder:
	docker-compose build builder

build-browser-sync:
	docker-compose build browser_sync

build-images: build-builder build-browser-sync

check-env-github-token:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is undefined)
endif
