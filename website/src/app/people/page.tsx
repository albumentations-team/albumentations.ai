'use client'

import Image from 'next/image'
import { Button } from '../components/Button'
import { TeamMember, team, ex_team } from '../data/team'

import Sponsors from '../components/Sponsors'

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="col px-2 mb-3">
      <div className="card shadow p-4 flex flex-col items-center text-center">
        <div className="mb-4">
          <Image
            src={`/assets/team_avatars/${member.photo}`}
            alt={member.name}
            width={200}
            height={200}
            className="img-fluid"
          />
        </div>
        <h4 className="h5 h-[60px]">{member.name}</h4>
        <ul className="list-none flex gap-2 mb-0 mt-2">
      {member.linkedin && (
        <li>
          <Button
            href={`https://linkedin.com/in/${member.linkedin}`}
            variant="outline-primary"
            size="sm"
            icon="fab fa-linkedin"
            external
            className="rounded"
          >
            {''}
          </Button>
        </li>
      )}
      {member.github && (
        <li>
          <Button
            href={`https://github.com/${member.github}`}
            variant="outline-primary"
            size="sm"
            icon="fab fa-github"
            external
            className="rounded"
          >
            {''}
          </Button>
        </li>
      )}
      {member.twitter && (
        <li>
          <Button
            href={`https://twitter.com/${member.twitter}`}
            variant="outline-primary"
            size="sm"
            icon="fab fa-twitter"
            external
            className="rounded"
          >
            {''}
          </Button>
        </li>
      )}
    </ul>
      </div>
    </div>
  )
}

export default function PeoplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Core Team Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-medium text-center mb-8">Core team</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Honorary Developers Section */}
      <div className="mb-12">
        <h1 className="text-2xl font-medium text-center mb-8">
          Honorary Developers. Were behind the creation of the library. Sadly not active anymore.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {ex_team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Contributors Section */}
      {/* <div className="mb-12">
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
      </div> */}

      <Sponsors />
    </div>
  )
}
