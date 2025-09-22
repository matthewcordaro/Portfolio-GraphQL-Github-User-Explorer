import { Button } from "@/components/ui/button"
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

type UserCardProps = {
  avatarUrl: string
  name: string
  bio: string
  url: string
}

function UserCard({ avatarUrl, name, bio, url }: UserCardProps) {
  return (
    <Card className='w-full lg:w-1/2 mb-8'>
      <CardHeader className='flex-row gap-x-8 items-center'>
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className='w-36 h-36 rounded-lg object-cover'
        />
        <div className='flex flex-col gap-y-2'>
          <CardTitle className='text-2xl font-bold mb-2'>
            {name || "no name"}
          </CardTitle>
          <CardDescription className='mb-4'>{bio || "no bio"}</CardDescription>
          <Button asChild size={"sm"} className='w-1/2'>
            <a href={url} target='_blank' rel='noreferrer'>
              Follow
            </a>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
export default UserCard
