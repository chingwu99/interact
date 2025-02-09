// import components
import Header from '@/components/Header'
import Form from '@/components/Form'
import PostItem from '@/components/posts/PostItem'
import CommentFeed from '@/components/posts/CommentFeed'
// import services
import { postServerService } from '@/services/post/server'
import { userServerService } from '@/services/user/server'

interface IParams {
  postId: string
}

interface PostViewProps {
  params: Promise<IParams>
}

const PostView = async ({ params }: PostViewProps) => {
  const { postId } = await params
  const fetchedPost = await postServerService.getPost(postId)
  const avatarUser = await userServerService.getUser(fetchedPost.userId)

  return (
    <>
      <Header showBackArrow label="Interact" />
      <PostItem postId={fetchedPost.id as string} data={fetchedPost} avatarUser={avatarUser} />
      <Form postId={postId as string} isComment placeholder="Interact your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default PostView
