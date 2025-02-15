// import services
import { userServerService } from '@/services/user/server'
// import components
import Header from '@/components/Header'
import UserBio from '@/components/users/UserBio'
import UserHero from '@/components/users/UserHero'
import PostFeed from '@/components/posts/PostFeed'

interface IParams {
  userId?: string
}

const UserView = async ({ params }: { params: Promise<IParams> }) => {
  const { userId } = await params

  const avatarUser = await userServerService.getUser(userId as string)

  return (
    <>
      <Header showBackArrow label={avatarUser?.name as string} />
      <UserHero avatarUser={avatarUser} />
      <UserBio avatarUser={avatarUser} />
      <PostFeed userId={userId} />
    </>
  )
}

export default UserView
