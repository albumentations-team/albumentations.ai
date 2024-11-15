import { TeamMember } from '../../data/team'
import { TeamMemberCard } from './TeamMemberCard'

interface TeamSectionProps {
  title: string
  members: TeamMember[]
  titleClassName?: string
}

export function TeamSection({ title, members, titleClassName = "text-3xl" }: TeamSectionProps) {
  // Adjust grid columns based on number of members
  const gridCols = members.length === 1
    ? "grid-cols-1"
    : members.length <= 2
    ? "md:grid-cols-2"
    : members.length <= 3
    ? "md:grid-cols-3"
    : "md:grid-cols-3 xl:grid-cols-4"

  return (
    <div className="mb-12">
      <h1 className={`${titleClassName} font-medium text-center mb-8`}>{title}</h1>
      <div className={`grid grid-cols-1 ${gridCols} gap-4 max-w-5xl mx-auto`}>
        {members.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  )
}
