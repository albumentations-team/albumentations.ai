from datetime import datetime
from lxml import etree
import os
import sys

directory = sys.argv[1]

docs_directory = os.path.join(directory, "docs")
sitemap_path = os.path.join(docs_directory, "sitemap.xml")
sitemap_path_gz = os.path.join(docs_directory, "sitemap.xml.gz")

tree = etree.parse(sitemap_path)
root = tree.getroot()

base_url = "https://albumentations.ai"
pages = [
    "",
    "/whos_using",
    "/team",
    "/contact_us",
]
date = datetime.utcnow().strftime("%Y-%m-%d")
for page in pages:
    sitemap_entry = etree.fromstring(
        f"""<url>
    <loc>{base_url}{page}</loc>
    <lastmod>{date}</lastmod>
    <changefreq>daily</changefreq>
</url>"""
    )
    root.append(sitemap_entry)

with open(os.path.join(directory, "sitemap.xml"), "w") as f:
    f.write(etree.tostring(root, pretty_print=True, xml_declaration=True, encoding="UTF-8").decode("utf-8"))

os.remove(sitemap_path)
os.remove(sitemap_path_gz)
