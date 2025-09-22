import { GET_USER } from "@/queries"
import { UserData } from "@/types"
import { useQuery } from "@apollo/client/react"
import UserCard from "./UserCard"
import StatsContainer from "./StatsContainer"
import PopularRepos from "../charts/PopularRepos"
import ForkedRepos from "../charts/ForkedRepos"
import UsedLanguages from "../charts/UsedLanguages"
import Loading from "./Loading"

type UserProfileProps = {
  userName: string
}
function UserProfile({ userName }: UserProfileProps) {
  const { loading, error, data } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  })

  if (loading) return <Loading />
  if (error) return <h2 className='text-xl'>Error: {error.message}</h2>
  // should never happen
  if (!data || !data.user) return <h2 className='text-xl'>User not found</h2>

  const {
    bio,
    avatarUrl,
    name,
    url,
    repositories,
    followers,
    following,
    gists,
  } = data.user

  return (
    <div>
      <UserCard avatarUrl={avatarUrl} name={name} bio={bio} url={url} />
      <StatsContainer
        numRepos={repositories.totalCount}
        numFollowers={followers.totalCount}
        numFollowing={following.totalCount}
        numGists={gists.totalCount}
      />
      {repositories.totalCount > 0 && (
        <div className='grid md:grid-cols-2 gap-4'>
          <UsedLanguages repositories={repositories.nodes} />
          <PopularRepos repositories={repositories.nodes} />
          <ForkedRepos repositories={repositories.nodes} />
        </div>
      )}
    </div>
  )
}
export default UserProfile
