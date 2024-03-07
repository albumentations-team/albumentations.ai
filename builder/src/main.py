import json
from pathlib import Path  # Use Path from pathlib instead of os.path

import click
from lib import staticjinja
from lib.formatters import get_prepared_citations
from lib.github import GitHubClient

TOP_REPOSITORIES_LIMIT = 12
CACHE_FILES = ["stars_count.json", "contributors.json", "top_repositories.json"]
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
)


@click.group()
def cli():
    pass


@cli.command()
@click.option("--use-reloader", is_flag=True)
@click.option("--data-dir", type=click.Path(), envvar="DATA_DIR", required=True)
@click.option("--build-dir", type=click.Path(), envvar="BUILD_DIR", required=True)
@click.option("--cache-dir", type=click.Path(), envvar="CACHE_DIR", required=True)
@click.option("--searchpath", type=click.Path(), envvar="SEARCHPATH", required=True)
@click.option("--base-url", type=str, envvar="BASE_URL", required=True)
@click.option("--mkdocs-port", type=str, envvar="MKDOCS_PORT", default=None)
def build(use_reloader, data_dir, cache_dir, searchpath, build_dir, base_url, mkdocs_port):
    cache_dir_path = Path(cache_dir)
    data_dir_path = Path(data_dir)

    for file_name in CACHE_FILES:
        file_path = cache_dir_path / file_name
        if not file_path.exists():
            error_message = f"Cached file {file_name} doesn't exist. Run `make fetch-data` to cache the latest data."
            raise FileNotFoundError(error_message)

    stars_count = json.loads((cache_dir_path / "stars_count.json").read_text())
    contributors = json.loads((cache_dir_path / "contributors.json").read_text())
    top_repositories = json.loads((cache_dir_path / "top_repositories.json").read_text())
    img_industry = json.loads((data_dir_path / "img_industry.json").read_text())
    team = json.loads((data_dir_path / "team.json").read_text())
    sponsors = json.loads((data_dir_path / "people.json").read_text())
    competitions = json.loads((data_dir_path / "competitions.json").read_text())
    citations = json.loads((data_dir_path / "citations.json").read_text())

    prepared_citations = get_prepared_citations(citations)

    staticjinja.build(
        build_dir=str(build_dir),  # Convert Path object to string
        searchpath=str(searchpath),  # Convert Path object to string
        staticpaths=["assets/"],
        use_reloader=use_reloader,
        env_globals={"base_url": base_url, "mkdocs_port": mkdocs_port},
        contexts=[
            ("index.html", {"stars_count": stars_count, "img_industry": img_industry}),
            (
                "whos_using.html",
                {
                    "citations": prepared_citations,
                    "competitions": competitions,
                    "top_repositories": top_repositories,
                    "img_industry": img_industry,
                },
            ),
            ("people.html", {"team": team, "contributors": contributors, "sponsors": sponsors}),
        ],
    )


@cli.command()
@click.option("--github-token", type=str, envvar="GITHUB_TOKEN", required=True)
@click.option("--data-dir", type=click.Path(), envvar="DATA_DIR", required=True)
@click.option("--cache-dir", type=click.Path(), envvar="CACHE_DIR", required=True)
@click.option("--repository", envvar="REPOSITORY", required=True)
@click.option("--additional_repositories", envvar="ADDITIONAL_REPOSITORIES", multiple=True)
def fetch_data(github_token, data_dir, cache_dir, repository, additional_repositories):
    # Replace print with logging if needed, else keep as is for simple scripts
    print(f"Fetching data for repository {repository} and additional repositories {additional_repositories}")
    client = GitHubClient(access_token=github_token)
    cache_dir_path = Path(cache_dir)
    data_dir_path = Path(data_dir)

    stars_count = client.get_repository_stars_rounded(repository)
    repo_names = json.loads((data_dir_path / "repo_names.json").read_text())

    top_repositories = client.get_top_repositories(repo_names, limit=TOP_REPOSITORIES_LIMIT)
    (cache_dir_path / "top_repositories.json").write_text(json.dumps(top_repositories))
    (cache_dir_path / "stars_count.json").write_text(json.dumps(stars_count))

    team = json.loads((data_dir_path / "team.json").read_text())
    team_github_usernames = [member["github"] for member in team]

    contributors = client.get_contributors(repository=repository, exclude_contributors=team_github_usernames)
    for additional_repo in additional_repositories:
        contributors += client.get_contributors(repository=additional_repo, exclude_contributors=team_github_usernames)

    deduplicated_contributors = []
    seen_contributor_ids = set()
    for contributor in contributors:
        if contributor["id"] not in seen_contributor_ids:
            deduplicated_contributors.append(contributor)
            seen_contributor_ids.add(contributor["id"])

    (cache_dir_path / "contributors.json").write_text(json.dumps(deduplicated_contributors))


if __name__ == "__main__":
    cli()
