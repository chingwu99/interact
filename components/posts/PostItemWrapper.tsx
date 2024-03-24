// import actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
// import components
import PostItem from "./PostItem";

interface PostItemWrapperProps {
  post: Record<string, any>;
}

const PostItemWrapper: React.FC<PostItemWrapperProps> = async ({ post }) => {
  const currentUser = await getCurrentUser();
  const avatarUser = await getUserById({ userId: post.user.id });
  return (
    <PostItem
      postId={post.id as string}
      key={post.id}
      data={post}
      currentUser={currentUser}
      avatarUser={avatarUser}
    />
  );
};

export default PostItemWrapper;
