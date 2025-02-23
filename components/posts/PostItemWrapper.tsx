import { User } from '@/type/user'

import { formatCreatedAt } from '../../utils/formatCreatedAt'

import PostItem from './PostItem'

interface PostItemWrapperProps {
  data: Record<string, any>
  currentUser: User | null
  isLiked: boolean
  likesCount: number
}

const PostItemWrapper: React.FC<PostItemWrapperProps> = ({ data = {}, currentUser, isLiked, likesCount }) => {
  const createdAt = formatCreatedAt(data.createdAt)

  return (
    <PostItem data={data} currentUser={currentUser} isLiked={isLiked} likesCount={likesCount} createdAt={createdAt} />
  )
}

export default PostItemWrapper
