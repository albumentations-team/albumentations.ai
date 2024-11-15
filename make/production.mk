# Production build commands
prod: export NODE_ENV=production
prod: check-env build-all

# Define build-all to explicitly depend on both targets
.PHONY: build-all
build-all: build-website build-docs
