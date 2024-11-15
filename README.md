# Static site generator for albumentations.ai

## Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [pre-commit](https://pre-commit.com/#install)
- [GNU Make](https://www.gnu.org/software/make/)

## Getting Started

1. Clone the repository.
2. Install the git hook scripts for pre-commit: `pre-commit install`.
3. Start development servers both for the main site and for the documentation: `make dev`. You can also start only the development server for the main site by running `make website-dev` or documentation by running `make docs-dev`.
4. Open http://localhost:3000 in your browser to see the current version of the main site.
5. Open http://localhost:8000 in your browser to see the current version of the documentation.
6. When you change files, the browser will automatically reload the changed pages.

## Directory structure

- [website](./website) - Next.js application for the main site
- [docs](./docs) - MkDocs configuration and source files for the documentation
- [tools](./tools) - Helper scripts and utilities

## Building for Production

To build the site for production:

1. Set required environment variables:
```bash
export GOOGLE_ANALYTICS_ID=<your_ga_id>
```

2. Run the production build:
```bash
make prod
```

This will create a `_build` directory containing the static site files.

## Updating Documentation

When you add or remove files in the [Albumentations repository](https://github.com/albumentations-team/albumentations/), you need to:

1. Update the documentation source in [docs/src](./docs/src)
2. Rebuild the site:
```bash
make prod
```

## Development Commands

- `make dev` - Start both website and docs development servers
- `make website-dev` - Start only the website development server
- `make docs-dev` - Start only the docs development server
- `make clean` - Clean build artifacts
- `make prod` - Build for production

## Contributing

1. Fork the repository
2. Create your feature branch
3. Install pre-commit hooks: `pre-commit install`
4. Make your changes
5. Submit a pull request
