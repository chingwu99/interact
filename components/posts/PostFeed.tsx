import { postServerService } from '@/services/post/server'

import PostItemWrapper from './PostItemWrapper'

interface PostFeedProps {
  userId?: string
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {
  const posts = await postServerService.getPosts(userId)

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      {posts.map((post: Record<string, any>) => (
        <PostItemWrapper key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostFeed
