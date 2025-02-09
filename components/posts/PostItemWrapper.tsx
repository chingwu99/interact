import { userServerService } from '@/services/user/server'

import PostItem from './PostItem'

interface PostItemWrapperProps {
  post: Record<string, any>
}

const PostItemWrapper: React.FC<PostItemWrapperProps> = async ({ post }) => {
  const avatarUser = await userServerService.getUser(post.user.id)
  return <PostItem postId={post.id as string} key={post.id} data={post} avatarUser={avatarUser} />
}

export default PostItemWrapper
