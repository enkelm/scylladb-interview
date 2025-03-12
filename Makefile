build-api:
	@go build -o ./tmp/main ./cmd/main.go
build-ui:
	@cd ./ui && npm run build
build:
	@make build-ui
	@make build-api

dev:
	air & \
	cd ./ui && npm run dev

run:
	@make build
	@./tmp/main
