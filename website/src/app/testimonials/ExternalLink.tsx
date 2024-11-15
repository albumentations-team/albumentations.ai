interface ExternalLinkProps {
    url: string
  }

  export function ExternalLink({ url }: ExternalLinkProps) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <i className="fas fa-external-link-alt" />
      </a>
    )
  }
