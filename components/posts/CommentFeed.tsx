import CommentItemWrapper from "./CommentItemWrapper";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment: Record<string, any>) => (
        <CommentItemWrapper key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
