# Static site generator for albumentations.ai

## Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [pre-commit](https://pre-commit.com/#install)
- [GNU Make](https://www.gnu.org/software/make/)

To run the site locally, you also need to download the required data from the GitHub API.
To do that, you need to generate a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

## Getting Started
1. Clone the repository.
2. Install the git hook scripts for pre-commit: `pre-commit install`.
3. Fetch required data from GitHub API: `GITHUB_TOKEN=<PERSONAL_ACCESS_TOKEN> make fetch-data`, e.g. `GITHUB_TOKEN=123a make fetch-data`.
4. Start the development server: `make dev`.
5. Open http://localhost:3000 in your browser to see the current version of the site.
6. Open http://localhost:8000 in your browser to see the current version of the documentation.
7. When you change templates or static assets, the browser will reload all changed pages.

## Directory structure
- [browser_sync](./browser_sync) - Files for a Docker service that automatically reloads changes pages in the browser.
- [builder](./builder) - Files for a Docker service that builds the static site from templates, static assets, and JSON files with data.
- [data](./data) - A directory with JSON files that contain data for building the site.
- [html](./html) - A directory with Jinja2 templates and static assets.
