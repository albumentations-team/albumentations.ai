# Albumentations Documentation Builder

This project contains the build system for Albumentations documentation and website. It uses Docker and Make to create a consistent build environment and streamline the development process.

## Prerequisites

- Docker
- Docker Compose
- Make
- Git

## Environment Variables

Create a `.env` file with the following variables:

```env
GOOGLE_ANALYTICS_ID=your_ga_id
GITHUB_TOKEN=your_github_token
MKDOCS_PORT=8000 # Optional, defaults to 8000
NODE_ENV=development # Or 'production' for builds
```

## Project Structure

```tree
.
├── docs/ # Documentation source
│ ├── src/ # MkDocs source files
│ ├── scripts/ # Build and utility scripts
│ └── Dockerfile # Docs container definition
├── website/ # Website source
│ └── Dockerfile # Website container definition
├── docker-compose.yml # Container orchestration
└── Makefile # Build automation
```

## Development

### Quick Start

1. Set up environment variables:

```bash
cp .env.example .env
```

Edit .env with your credentials

2. Start development server:

```bash
make docs-dev
```

The documentation will be available at `http://localhost:8000`

### Available Commands

#### Development

- `make docs-dev` - Start documentation server in development mode
- `make dev` - Start both website and docs in development mode
- `make setup` - Set up development environment
- `make download-notebooks` - Download and convert example notebooks
- `make build-local` - Build documentation locally

#### Production

- `make prod` - Build both website and docs for production
- `make build-docs` - Build only documentation
- `make build-website` - Build only website
- `make build-all` - Build everything

#### Utility Commands

- `make clean` - Clean all build artifacts
- `make logs` - Show container logs
- `make ps` - List running containers
- `make restart` - Restart containers
- `make stop` - Stop containers

## Docker Configuration

### Documentation Container

- Base image: Python 3.12
- Exposed port: 8000
- Volumes:
  - Development: `./docs:/workspace/docs`
  - Cache: `docs_cache:/workspace/docs/src/.cache`

### Environment Variables

- `WORKSPACE_DIR=/workspace`
- `DOCS_DIR=/workspace/docs`
- `ALBUMENTATIONS_DIR=/workspace/albumentations`
- `JUPYTER_PLATFORM_DIRS=1`
- `GOOGLE_ANALYTICS_ID` (from .env)

## Production Build

To create a production build:

1. Ensure environment variables are set

```bash
export NODE_ENV=production
export GOOGLE_ANALYTICS_ID=your_ga_id
export GITHUB_TOKEN=your_github_token
```

2. Run production build:

```bash
make prod
```

Build artifacts will be in:

- Website: `_build/`
- Documentation: `_build/docs/`

## Development Notes

- The development server supports hot reloading
- Notebook conversion is done in parallel for better performance
- Cache is preserved between builds in a Docker volume
- Health checks are configured for the documentation server

## Troubleshooting

1. If builds fail, try cleaning first:

```bash
make clean
make build-all
```

2. For permission issues:

```bash
sudo chown -R $(id -u):$(id -g) build/
```

3. To reset the environment:

```bash
docker-compose down -v
make clean
make setup
```
