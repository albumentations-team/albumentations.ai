import sys
from datetime import datetime, timezone
from pathlib import Path

from lxml import etree

# Assuming the first argument is the directory
directory = Path(sys.argv[1])

docs_directory = directory / "docs"
docs_sitemap_path = docs_directory / "sitemap.xml"
output_sitemap_path = directory / "sitemap.xml"

# Define namespace correctly
NSMAP = {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

# Create new root element with namespace
root = etree.Element("urlset", nsmap=NSMAP)

# Load and merge docs sitemap if it exists
if docs_sitemap_path.exists():
    docs_tree = etree.parse(str(docs_sitemap_path))
    docs_urls = docs_tree.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}url")
    for url in docs_urls:
        root.append(url)

# Add main website pages
base_url = "https://albumentations.ai"
pages = [
    "",
    "/people",
    "/testimonials",
]
date = datetime.now(timezone.utc).strftime("%Y-%m-%d")

for page in pages:
    sitemap_entry = etree.fromstring(
        f"""<url>
    <loc>{base_url}{page}</loc>
    <lastmod>{date}</lastmod>
    <changefreq>daily</changefreq>
</url>""",
    )
    root.append(sitemap_entry)

# Write the merged sitemap
with output_sitemap_path.open("w", encoding="utf-8") as f:
    f.write(etree.tostring(root, pretty_print=True, xml_declaration=True, encoding="UTF-8").decode("utf-8"))
