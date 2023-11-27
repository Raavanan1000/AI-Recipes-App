up:
	docker compose up -d
down:
	docker compose down

# front
front-install:
	docker compose exec react npm install
front-dev: front-install
	docker compose exec -ti react npm run dev
front-shell:
	docker compose exec -ti react /bin/sh