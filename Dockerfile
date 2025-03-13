FROM node:22-bullseye AS ui-builder
WORKDIR /app
COPY ui/package.json ui/package-lock.json ./ui/
RUN cd ui && npm i
COPY ui/ ./ui/
RUN cd ui && npm run build

FROM golang:1.24.1-bullseye AS api-builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod tidy
COPY . .
RUN make build-api-prod

FROM gcr.io/distroless/static-debian11
WORKDIR /app
COPY  --from=api-builder /app/bin .
EXPOSE 6000
CMD ["/app/app"]
