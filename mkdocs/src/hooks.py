from urllib.parse import urlparse

from bs4 import BeautifulSoup


SITE_NETLOC = "albumentations.ai"


def external_links_target_blank(html, page, config, **kwargs):
    soup = BeautifulSoup(html, "html.parser")
    links = soup.find_all("a")
    for link in links:
        if "href" not in link:
            continue
        netloc = urlparse(link["href"]).netloc
        if netloc and netloc != SITE_NETLOC:
            link["target"] = "_blank"
    return str(soup)
