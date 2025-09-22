import StatsCard from "./StatsCard"

type StatsContainerProps = {
  numRepos: number
  numFollowers: number
  numFollowing: number
  numGists: number
}

function StatsContainer({
  numRepos,
  numFollowers,
  numFollowing,
  numGists,
}: StatsContainerProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mb-8 '>
      <StatsCard title='Repositories' count={numRepos} />
      <StatsCard title='Followers' count={numFollowers} />
      <StatsCard title='Following' count={numFollowing} />
      <StatsCard title='Gists' count={numGists} />
    </div>
  )
}
export default StatsContainer
