from github import Github, GithubException


class GitHubClient:
    def __init__(self, access_token):
        self.g = Github(access_token)

    @staticmethod
    def _get_stars_count_rounded(stargazers_count):
        if stargazers_count > 1000:
            return str(round(stargazers_count / 1000, 1)) + "k"
        return str(stargazers_count)

    def get_repository_stars_rounded(self, repository):
        repo = self.g.get_repo(repository)
        stars_rounded = self._get_stars_count_rounded(repo.stargazers_count)
        return stars_rounded

    def get_repository_file_content(self, repository, filename):
        repo = self.g.get_repo(repository)
        contents = repo.get_contents(filename)
        return contents.decoded_content.decode('utf-8')

    def get_contributors(self, repository, exclude_contributors=None):
        repo = self.g.get_repo(repository)
        if exclude_contributors is None:
            exclude_contributors = set()
        exclude_contributors = set(exclude_contributors)
        contributors = repo.get_contributors()
        contributors_data = [c.raw_data for c in contributors]
        contributors_data = [c for c in contributors_data if c["login"] not in exclude_contributors]
        return contributors_data

    def get_top_repositories(self, repo_names, limit):
        repositories = []
        for repo_name in repo_names:
            try:
                repo = self.g.get_repo(repo_name)
            except GithubException.UnknownObjectException:
                continue
            stars_rounded = self._get_stars_count_rounded(repo.stargazers_count)
            repositories.append(
                {
                    "title": repo_name,
                    "stars": repo.stargazers_count,
                    "stars_rounded": stars_rounded,
                    "description": repo.description,
                }
            )

        top_repositories = list(sorted(repositories, key=lambda r: r["stars"], reverse=True))[:limit]
        return top_repositories
