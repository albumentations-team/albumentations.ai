# Utility commands
clean:
	rm -rf website/.next
	rm -rf docs/src/site
	rm -rf "$(BUILD_DIR)"
	docker compose down -v
	docker rm temp_website temp_docs 2>/dev/null || true
	docker volume rm -f albumentations_docs_cache || true

logs:
	docker compose logs -f

ps:
	docker compose ps

restart:
	docker compose restart

stop:
	docker compose stop
