import sys
from datetime import datetime, timezone
from pathlib import Path

from lxml import etree

# Assuming the first argument is the directory
directory = Path(sys.argv[1])

docs_directory = directory / "docs"
sitemap_path = docs_directory / "sitemap.xml"
sitemap_path_gz = docs_directory / "sitemap.xml.gz"


tree = etree.parse(str(sitemap_path))
root = tree.getroot()

base_url = "https://albumentations.ai"
pages = [
    "",
    "/whos_using",
    "/people",
    "/documentation",
]
date = datetime.now(timezone.utc).strftime("%Y-%m-%d")  # Compliant with best practices for timezones
for page in pages:
    sitemap_entry = etree.fromstring(
        f"""<url>
    <loc>{base_url}{page}</loc>
    <lastmod>{date}</lastmod>
    <changefreq>daily</changefreq>
</url>""",
    )
    root.append(sitemap_entry)

# Replace open with Path.open
with (directory / "sitemap.xml").open("w", encoding="utf-8") as f:  # This uses Path's open method directly
    f.write(etree.tostring(root, pretty_print=True, xml_declaration=True, encoding="UTF-8").decode("utf-8"))
