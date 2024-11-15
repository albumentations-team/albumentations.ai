import Image from 'next/image'

interface Contributor {
  login: string
  avatar_url: string
  contributions: number
  html_url: string
}

export function Contributors({ contributors }: { contributors: Contributor[] }) {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-medium text-center mb-8">Contributors</h1>
      <div className="flex flex-wrap gap-2">
        {contributors.map((contributor) => (
          <div key={contributor.login} className="border border-gray-300">
            <a href={`https://github.com/${contributor.login}`} target="_blank" rel="noopener noreferrer">
              <Image
                src={contributor.avatar_url}
                alt={contributor.login}
                title={contributor.login}
                width={70}
                height={70}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
