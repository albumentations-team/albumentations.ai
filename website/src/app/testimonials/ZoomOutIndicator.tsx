export function ZoomOutIndicator() {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/75 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <i className="fas fa-search-minus" />
          <span>Click to close</span>
        </div>
      </div>
    )
  }
