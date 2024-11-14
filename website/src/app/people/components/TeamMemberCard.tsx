'use client'

import Image from 'next/image'
import { Button } from '../../components/Button'
import { TeamMember } from '../../data/team'

export function TeamMemberCard({ member, size = 'normal' }: { member: TeamMember, size?: 'normal' | 'large' }) {
  const imageSize = size === 'large' ? 300 : 200
  return (
    <div className="col px-2 mb-3">
      <div className={`card shadow p-4 flex flex-col items-center text-center ${size === 'large' ? 'max-w-md mx-auto' : ''}`}>
        <div className="mb-4">
          <Image
            src={`/assets/team_avatars/${member.photo}`}
            alt={member.name}
            width={imageSize}
            height={imageSize}
            className="img-fluid"
          />
        </div>
        <h4 className={`h5 h-[60px] ${size === 'large' ? 'text-xl' : ''}`}>{member.name}</h4>
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
          {member.kaggle && (
            <li>
              <Button
                href={`https://kaggle.com/${member.kaggle}`}
                variant="outline-primary"
                size="sm"
                icon="fab fa-kaggle"
                external
                className="rounded"
              >
                {''}
              </Button>
            </li>
          )}

          {member.instagram && (
            <li>
              <Button
                href={`https://instagram.com/${member.instagram}`}
                variant="outline-primary"
                size="sm"
                icon="fab fa-instagram"
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
