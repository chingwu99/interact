import { formatCreatedAt } from '../../utils/formatCreatedAt'

import CommentItem from './CommentItem'

interface CommentItemWrapperProps {
  data: Record<string, any>
}

const CommentItemWrapper: React.FC<CommentItemWrapperProps> = ({ data = {} }) => {
  const createdAt = formatCreatedAt(data.createdAt)

  return <CommentItem data={data} createdAt={createdAt} />
}

export default CommentItemWrapper
