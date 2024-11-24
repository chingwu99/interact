import getUserById from '@/app/actions/getUserById'

import CommentItem from './CommentItem'

interface CommentItemWrapperProps {
  comment: Record<string, any>
}

const CommentItemWrapper: React.FC<CommentItemWrapperProps> = async ({ comment }) => {
  const avatarUser = await getUserById({ userId: comment.user.id })
  return <CommentItem data={comment} avatarUser={avatarUser} />
}

export default CommentItemWrapper
