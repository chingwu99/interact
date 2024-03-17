import getPosts from "@/app/actions/getPosts";
import PostItemWrapper from "./PostItemWrapper";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {
  const posts = await getPosts({ userId });

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItemWrapper key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostFeed;
