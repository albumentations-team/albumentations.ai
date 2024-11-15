interface SocialOverlayProps {
    platform: string
  }

  export function SocialOverlay({ platform }: SocialOverlayProps) {
    return (
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <i className={`fab fa-${platform} text-white text-2xl`} />
      </div>
    )
  }
