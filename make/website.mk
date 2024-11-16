build-website:
	@if [ -z "$$GITHUB_TOKEN" ]; then \
		echo "Error: GITHUB_TOKEN is not set"; \
		exit 1; \
	fi
	@echo "Using BUILD_DIR: $(BUILD_DIR)"
	# Clean up any existing temporary container
	docker rm temp_website 2>/dev/null || true
	# Build website container
	docker compose build website
	# Extract build artifacts
	@mkdir -p "$(BUILD_DIR)"
	docker create --name temp_website albumentationsai-website
	docker cp "temp_website:/website/build/." "$(BUILD_DIR)/"
	# Verify the structure
	ls -la "$(BUILD_DIR)"
	ls -la "$(BUILD_DIR)/_next" || true
	# Ensure proper permissions
	chmod -R 755 "$(BUILD_DIR)"
	# Clean up
	docker rm temp_website
