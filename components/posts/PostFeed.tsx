import type { User } from '@/type/user'
import { getPosts } from '@/action/getPosts'

import PostItem from './PostItem'

interface PostFeedProps {
  userId?: string
  currentUser: User | null
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId, currentUser }) => {
  const posts = await getPosts({ userId })

  const isLiked = (post: Record<string, any>) => post.likedIds?.includes(currentUser?.id as string) || false
  const likesCount = (post: Record<string, any>) => post.likedIds?.length || 0

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      {posts.map((post: Record<string, any>) => (
        <PostItem
          key={post.id}
          data={post}
          currentUser={currentUser}
          isLiked={isLiked(post)}
          likesCount={likesCount(post)}
        />
      ))}
    </div>
  )
}

export default PostFeed
