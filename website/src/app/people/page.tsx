import { TeamSection } from './components/TeamSection'
import { Contributors } from './components/Contributors'
import { team, ex_team } from '../data/team'
import { getContributors } from '@/lib/github'
import Sponsors from '../components/Sponsors'

export default async function PeoplePage() {
  const contributors = await getContributors()

  return (
    <div className="container mx-auto px-4 py-8">
      <TeamSection
        title="Core team"
        members={team}
      />

      <TeamSection
        title="Honorary Developers. Were behind the creation of the library. Sadly not active anymore."
        members={ex_team}
        titleClassName="text-2xl"
      />

      <Contributors contributors={contributors} />

      <Sponsors />
    </div>
  )
}
