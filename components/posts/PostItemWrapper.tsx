import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import PostItem from "./PostItem";

interface PostItemWrapperProps {
  post: Record<string, any>;
}

const PostItemWrapper: React.FC<PostItemWrapperProps> = async ({ post }) => {
  const currentUser = await getCurrentUser();
  const fetchedUser = await getUserById({ userId: post.user.id });
  return (
    <PostItem
      postId={post.id as string}
      key={post.id}
      data={post}
      currentUser={currentUser}
      fetchedUser={fetchedUser}
    />
  );
};

export default PostItemWrapper;
