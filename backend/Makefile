include .env

DOCKER_IMAGE_NAME := rifinha
DOCKER_IMAGE_TAG := latest

up:
	docker-compose up -d postgres

down:
	docker-compose down

reset:
	npx prisma migrate reset

db:
	npx prisma studio

build:
	docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} .
