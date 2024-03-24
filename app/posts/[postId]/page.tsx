// import actions
import getPostById, { IParams } from "@/app/actions/getPostById";
import getUserById from "@/app/actions/getUserById";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import components
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";

interface PostViewProps {
  params: IParams;
}

const PostView = async ({ params }: PostViewProps) => {
  const { postId } = params;
  const fetchedPost = await getPostById(params);
  const currentUser = await getCurrentUser();
  const avatarUser = await getUserById({ userId: fetchedPost.userId });

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
        avatarUser={avatarUser}
        currentUser={currentUser}
      />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
        avatarUser={currentFetchedUser}
        currentUser={currentUser}
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
