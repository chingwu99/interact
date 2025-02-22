// import services
import { getUser } from '@/action/getUser'
// import components
import Header from '@/components/Header'
import UserBio from '@/components/users/UserBio'
import UserHero from '@/components/users/UserHero'
import PostFeed from '@/components/posts/PostFeed'
import { getServerSession } from '@/action/getServerSession'

interface IParams {
  userId?: string
}

const UserView = async ({ params }: { params: Promise<IParams> }) => {
  const { userId } = await params
  const avatarUser = await getUser({ userId })
  const currentUser = await getServerSession()
  const isFollowing = currentUser?.followingIds?.includes(userId as string) || false

  return (
    <>
      <Header showBackArrow label={avatarUser?.name as string} />
      <UserHero avatarUser={avatarUser} />
      <UserBio avatarUser={avatarUser} currentUser={currentUser} isFollowing={isFollowing} />
      <PostFeed userId={userId} currentUser={currentUser} />
    </>
  )
}

export default UserView
