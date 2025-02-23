import CommentItemWrapper from './CommentItemWrapper'

interface CommentFeedProps {
  comments?: Record<string, any>[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => (
  <>
    {comments.map((comment: Record<string, any>) => (
      <CommentItemWrapper key={comment.id} data={comment} />
    ))}
  </>
)

export default CommentFeed
