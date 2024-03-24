import getUserById from "@/app/actions/getUserById";
import CommentItem from "./CommentItem";

interface CommentItemWrapperProps {
  comment: Record<string, any>;
}

const CommentItemWrapper: React.FC<CommentItemWrapperProps> = async ({
  comment,
}) => {
  const fetchedUser = await getUserById({ userId: comment.user.id });
  return <CommentItem data={comment} fetchedUser={fetchedUser} />;
};

export default CommentItemWrapper;
