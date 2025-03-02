// import components
import Header from '@/components/Header'
import Form from '@/components/Form'
import PostItem from '@/components/posts/PostItem'
import CommentFeed from '@/components/posts/CommentFeed'
// import services
import { getPost } from '@/action/getPost'
import { getServerSession } from '@/action/getServerSession'
import { formatCreatedAt } from '@/utils/formatCreatedAt'

interface IParams {
  postId: string
}

interface PostViewProps {
  params: Promise<IParams>
}

const PostView = async ({ params }: PostViewProps) => {
  const { postId } = await params
  const postData = await getPost({ postId })
  const currentUser = await getServerSession()
  const isLiked = postData.likedIds?.includes(currentUser?.id as string) || false
  const likesCount = postData.likedIds?.length || 0
  const createdAt = formatCreatedAt(postData.createdAt)

  return (
    <>
      <Header showBackArrow label="Interact" />
      <PostItem
        data={postData}
        currentUser={currentUser}
        isLiked={isLiked}
        likesCount={likesCount}
        createdAt={createdAt}
      />
      <Form postId={postId as string} isComment placeholder="Interact your reply" currentUser={currentUser} />
      <CommentFeed comments={postData?.comments} />
    </>
  )
}

export default PostView
