import { postServerService } from '@/services/post/server'

import PostItem from './PostItem'

interface PostFeedProps {
  userId?: string
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {
  const posts = await postServerService.getPosts(userId)

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} />
      ))}
    </div>
  )
}

export default PostFeed
