# ScyllaDB Interview Project

This repository contains a web application built with Go (Backend) and React (Frontend).

## Prerequisites

To run this project, you'll need:
- Go 1.24.1 or higher
- Node.js 22 or higher
- npm
- Docker (for production builds)
- Make

## Getting Started

### Development Mode

To run the application in development mode with hot reloading:

```bash
make dev
```

This will start both the backend API server using Air (for hot reloading) and the frontend development server with Vite.

### Building the Application

#### Build for Development

To build both the frontend and backend for development:

```bash
make build
```

This compiles the UI assets and builds the Go application for your local environment.

#### Run Locally After Building

To build and run the application locally:

```bash
make run
```

#### Build for Production

To build the application for production:

```bash
make build-prod
```

This creates optimized builds for deployment.

### Running in Production

To build a Docker container and run the application:

```bash
make run-prod
```

This command:
1. Builds a Docker image for the application
2. Runs the container with port 6000 exposed

## Bonus features
### UI
- Search
- Local Storage
- Dark mode
- Description collapse/expand

### API
- Dockerization
- Simple Caching

## Dependencies

### Backend
- Go 1.24.1
- Echo v4.13.3 (Web framework)

### Frontend
- React 19
- Vite (Build tool)
- TanStack Router (Routing)
- Tailwind CSS (Styling)
- Shadcn UI (UI components)
- TypeScript

## Project Structure

- `/cmd` - Contains the main entry point for the Go application
- `/ui` - Contains the React frontend application
- `/bin` - Output directory for production builds
- `/tmp` - Output directory for development builds

## Docker Support

The project includes a multi-stage Dockerfile that:
1. Builds the UI assets using Node.js
2. Builds the Go application
3. Creates a minimal production image based on distroless

The production container exposes port 6000.

## Additional Commands

- `make build-api`: Build only the backend for development
- `make build-api-prod`: Build only the backend for production
- `make build-ui`: Build only the frontend

# Part 2: ScyllaDB Calculator
[Here](https://docs.google.com/document/d/1HnEMMYiWM0-LSP8dBfLNF86RVL4Qh0TnYmMU4Bczbpc/edit?usp=sharing) you can find the link to a google doc explaining the ScyllaDB Calculator design.
