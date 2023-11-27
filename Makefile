up:
	docker compose up -d
down:
	docker compose down

# back
back-install:
	docker compose exec node npm install
back-dev: back-install
	docker compose exec -ti node npm run start:dev
back-shell:
	docker compose exec -ti node /bin/sh

# front
front-install:
	docker compose exec react npm install
front-dev: front-install
	docker compose exec -ti react npm run dev
front-shell:
	docker compose exec -ti react /bin/sh

# prisma
prisma-client:
	docker compose exec node npx prisma generate
prisma-db:
	docker compose exec node npx prisma db push
seed:
	docker compose exec node npx prisma db seed