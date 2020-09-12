import json
import os

import click

from lib import staticjinja
from lib.formatters import get_prepared_citations
from lib.github import GitHubClient


TOP_REPOSITORIES_LIMIT = 12
CACHE_FILES = ("stars_count.json", "contributors.json", "top_repositories.json")
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"


@click.group()
def cli():
    pass


@cli.command()
@click.option("--use-reloader", is_flag=True)
@click.option("--data-dir", type=str, envvar="DATA_DIR", required=True)
@click.option("--build-dir", type=str, envvar="BUILD_DIR", required=True)
@click.option("--cache-dir", type=str, envvar="CACHE_DIR", required=True)
@click.option("--searchpath", type=str, envvar="SEARCHPATH", required=True)
@click.option("--base-url", type=str, envvar="BASE_URL", required=True)
@click.option("--mkdocs-port", type=str, envvar="MKDOCS_PORT", default=None)
def build(use_reloader, data_dir, cache_dir, searchpath, build_dir, base_url, mkdocs_port):

    for f in CACHE_FILES:
        if not os.path.exists(os.path.join(cache_dir, f)):
            raise FileNotFoundError(f"Cached file {f} doesn't exist. Run `make fetch-data` to cache the latest data.")

    with open(os.path.join(cache_dir, "stars_count.json")) as f:
        stars_count = json.load(f)

    with open(os.path.join(cache_dir, "contributors.json")) as f:
        contributors = json.load(f)

    with open(os.path.join(cache_dir, "top_repositories.json")) as f:
        top_repositories = json.load(f)

    with open(os.path.join(data_dir, "img_industry.json")) as f:
        img_industry = json.load(f)

    with open(os.path.join(data_dir, "team.json")) as f:
        team = json.load(f)

    with open(os.path.join(data_dir, "competitions.json")) as f:
        competitions = json.load(f)

    with open(os.path.join(data_dir, "citations.json")) as f:
        citations = json.load(f)
        prepared_citations = get_prepared_citations(citations)

    staticjinja.build(
        build_dir=build_dir,
        searchpath=searchpath,
        staticpaths=["assets/"],
        use_reloader=use_reloader,
        env_globals={"base_url": base_url, "mkdocs_port": mkdocs_port},
        contexts=[
            ("index.html", {"stars_count": stars_count}),
            (
                "whos_using.html",
                {
                    "citations": prepared_citations,
                    "competitions": competitions,
                    "top_repositories": top_repositories,
                    "img_industry": img_industry,
                },
            ),
            ("team.html", {"team": team, "contributors": contributors}),
        ],
    )


@cli.command()
@click.option("--github-token", type=str, envvar="GITHUB_TOKEN", required=True)
@click.option("--data-dir", type=str, envvar="DATA_DIR", required=True)
@click.option("--cache-dir", type=str, envvar="CACHE_DIR", required=True)
@click.option("--repository", envvar="REPOSITORY", required=True)
@click.option("--additional_repositories", envvar="ADDITIONAL_REPOSITORIES", multiple=True)
def fetch_data(github_token, data_dir, cache_dir, repository, additional_repositories):
    client = GitHubClient(access_token=github_token,)

    stars_count = client.get_repository_stars_rounded(repository)

    with open(os.path.join(data_dir, "repo_names.json")) as f:
        repo_names = json.load(f)

    top_repositories = client.get_top_repositories(repo_names, limit=TOP_REPOSITORIES_LIMIT)

    with open(os.path.join(cache_dir, "top_repositories.json"), "w") as f:
        json.dump(top_repositories, f)

    with open(os.path.join(cache_dir, "stars_count.json"), "w") as f:
        json.dump(stars_count, f)

    with open(os.path.join(data_dir, "team.json")) as f:
        team = json.load(f)
        team_github_usernames = [member["github"] for member in team]

    contributors = client.get_contributors(repository=repository, exclude_contributors=team_github_usernames)
    for repository in additional_repositories:
        contributors += client.get_contributors(repository=repository, exclude_contributors=team_github_usernames)

    deduplicated_contributors = []
    seen_contributor_ids = set()
    for contributor in contributors:
        contributor_id = contributor["id"]
        if contributor_id not in seen_contributor_ids:
            deduplicated_contributors.append(contributor)
            seen_contributor_ids.add(contributor_id)

    with open(os.path.join(cache_dir, "contributors.json"), "w") as f:
        json.dump(deduplicated_contributors, f)


if __name__ == "__main__":
    cli()
