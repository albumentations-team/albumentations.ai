def get_prepared_citations(citations):
    prepared_citations = []
    for citation in citations:
        url = citation.get("url")

        authors = []
        for author in citation["author"]:
            author_link = citation["author_links"].get(author)
            if author_link:
                author = f'<a href="{author_link}" target="_blank" class="border-link">{author}</a>'
            authors.append(author)
        authors = ", ".join(authors)

        if url:
            title = f'<a href="{citation["url"]}" target="_blank" class="border-link">{citation["title"]}</a>'
        else:
            title = citation["title"]

        prepared_citation = {
            "title": title,
            "authors": authors,
        }
        prepared_citations.append(prepared_citation)
    return prepared_citations
