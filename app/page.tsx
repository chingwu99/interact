import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import { getServerSession } from '@/action/getServerSession'

export const dynamic = 'force-dynamic'

const Home = async () => {
  const currentUser = await getServerSession()

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" currentUser={currentUser} />
      <PostFeed currentUser={currentUser} />
    </>
  )
}

export default Home
