build-api-prod:
	@CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./bin/app ./cmd/main.go
build-api:
	@go build -o ./tmp/main ./cmd/main.go
build-ui:
	@cd ./ui && npm run build

build: build-ui build-api
build-prod: build-ui build-api-prod

dev:
	air & \
	cd ./ui && npm run dev

run:
	@make build
	@./tmp/main

run-prod:
	@docker build -t app .
	@docker run --rm -p 6000:6000 app
