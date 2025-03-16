import CommentItemWrapper from './CommentItemWrapper'

interface CommentFeedProps {
  comments?: Record<string, any>[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => (
  <div className="max-h-[90vh] overflow-y-auto">
    {comments.map((comment: Record<string, any>) => (
      <CommentItemWrapper key={comment.id} data={comment} />
    ))}
  </div>
)

export default CommentFeed
