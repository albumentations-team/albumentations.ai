import os

from staticjinja import Site


class AlbumentationsSite(Site):
    def is_template(self, filename):
        head, tail = os.path.split(filename)
        return head == "" and tail.endswith(".html")


def build(build_dir, searchpath, staticpaths, env_globals, use_reloader=False, contexts=None):
    os.makedirs(build_dir, exist_ok=True)
    site = AlbumentationsSite.make_site(
        searchpath=searchpath, outpath=build_dir, staticpaths=staticpaths, contexts=contexts, env_globals=env_globals
    )
    site.render(use_reloader=use_reloader)
