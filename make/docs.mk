# Documentation build commands
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
