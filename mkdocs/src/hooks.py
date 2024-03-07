import json
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup
from mkdocs_jupyter.plugin import NotebookFile

sys.path.append("/albumentations/tools")


def on_pre_page(page, config, files):
    if isinstance(page.file, NotebookFile):
        filename = Path(page.file.src_path).name
        page.is_jupyter_notebook = True
        page.notebook_github_url = urljoin(config["notebook_github_uri"], filename)
        page.notebook_colab_url = urljoin(config["notebook_colab_uri"], filename)
    return page


def on_page_content(html, page, config, **kwargs):
    site_netloc = urlparse(config["site_url"]).netloc
    soup = BeautifulSoup(html, "html.parser")
    links = soup.find_all("a", href=True)
    for link in links:
        netloc = urlparse(link["href"]).netloc
        if netloc and netloc != site_netloc:
            link["target"] = "_blank"

    return str(soup)


def on_nav(nav, config, files):
    for page in nav.pages:
        if isinstance(page.file, NotebookFile):
            with Path(page.file.abs_src_path).open() as f:
                content = json.load(f)
                for cell in content["cells"]:
                    if cell["cell_type"] != "markdown":
                        continue
                    source = cell["source"]
                    if source and source[0].startswith("# "):
                        page.title = source[0][2:]
                        break
    return nav
