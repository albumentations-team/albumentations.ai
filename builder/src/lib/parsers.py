import os
from urllib.parse import urlparse

from bs4 import BeautifulSoup


def parse_used_by(readme_html):
    used_by = []
    soup = BeautifulSoup(readme_html, 'html5lib')
    links = soup.find("h2", id="used-by").find_next('p').find_all('a', href=True)
    for link in links:
        url = link['href']
        name = urlparse(url).netloc
        img_url = link.find('img')['src']
        _, ext = os.path.splitext(img_url)
        img_filename = name + ext

        company = {
            'url': url,
            'name': name,
            'img_url': img_url,
            'img_filename': img_filename,
        }
        used_by.append(company)
    return used_by
