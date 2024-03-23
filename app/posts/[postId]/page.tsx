import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import getPostById, { IParams } from "@/app/actions/getPostById";
import getUserById from "@/app/actions/getUserById";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface PostViewProps {
  params: IParams;
}

const PostView = async ({ params }: PostViewProps) => {
  const { postId } = params;
  const fetchedPost = await getPostById(params);
  const currentUser = await getCurrentUser();
  const fetchedUser = await getUserById({ userId: fetchedPost.userId });

  let currentFetchedUser = null;

  if (currentUser) {
    currentFetchedUser = await getUserById({ userId: currentUser?.id });
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem
        postId={fetchedPost.id as string}
        data={fetchedPost}
        fetchedUser={fetchedUser}
        currentUser={currentUser}
      />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
        fetchedUser={currentFetchedUser}
        currentUser={currentUser}
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
