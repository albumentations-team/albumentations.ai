interface CloseButtonProps {
    onClick: () => void
  }

  export function CloseButton({ onClick }: CloseButtonProps) {
    return (
      <button
        className="absolute -top-12 right-0 text-white text-xl hover:text-gray-300"
        onClick={onClick}
      >
        <i className="fas fa-times" />
      </button>
    )
  }
