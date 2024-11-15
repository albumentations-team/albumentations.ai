# Development commands
dev: export NODE_ENV=development
dev: build-all
	docker compose up -V website docs

docs-dev: export NODE_ENV=development
docs-dev:
	docker compose up docs

# Development helpers
setup:
	cd docs && ./scripts/setup.sh

download-notebooks:
	cd docs && ./scripts/download_notebooks.sh

build-local:
	cd docs && ./scripts/build.sh
