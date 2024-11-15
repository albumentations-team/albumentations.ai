SHELL := /bin/bash

# Load all makefiles from the make directory
-include make/*.mk

# Basic variables
CURRENT_DIR := $(shell pwd)
BUILD_DIR ?= $(CURRENT_DIR)/_build
WORKSPACE_DIR := $(CURRENT_DIR)

# Export common variables
export PORT ?= 3000
export MKDOCS_PORT ?= 8000
export NODE_ENV
export WORKSPACE_DIR
export BUILD_DIR
export GITHUB_PAGES
export REPOSITORY_NAME

.PHONY: dev prod build-all check-env clean
