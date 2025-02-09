import { userServerService } from '@/services/user/server'

import CommentItem from './CommentItem'

interface CommentItemWrapperProps {
  comment: Record<string, any>
}

const CommentItemWrapper: React.FC<CommentItemWrapperProps> = async ({ comment }) => {
  const avatarUser = await userServerService.getUser(comment.user.id)
  return <CommentItem data={comment} avatarUser={avatarUser} />
}

export default CommentItemWrapper
