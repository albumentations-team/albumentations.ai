import sys
from datetime import datetime, timezone
from pathlib import Path

from lxml import etree

# Assuming the first argument is the directory
directory = Path(sys.argv[1])

docs_directory = directory / "docs"
sitemap_path = docs_directory / "sitemap.xml"
sitemap_path_gz = docs_directory / "sitemap.xml.gz"

# Addressing the lxml usage warning is complex; it's based on your data source.
# If your XML data is trusted, this might be a false positive.
# Otherwise, consider sanitization or alternative parsing libraries for untrusted data.
# Here, I proceed assuming the data is trusted:
tree = etree.parse(str(sitemap_path))  # Convert Path object to string for lxml compatibility
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

# Use unlink for Path objects instead of os.remove
sitemap_path.unlink(missing_ok=True)  # The missing_ok=True argument ignores the error if the file doesn't exist.
sitemap_path_gz.unlink(missing_ok=True)
