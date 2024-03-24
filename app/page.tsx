// import actions
import getCurrentUser from "./actions/getCurrentUser";
import getUserById from "./actions/getUserById";
// import components
import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";

const Home = async () => {
  const currentUser = await getCurrentUser();

  let avatarUser = null;

  if (currentUser) {
    avatarUser = await getUserById({ userId: currentUser?.id });
  }

  return (
    <>
      <Header label="Home" />
      <Form
        placeholder="What's happening?"
        currentUser={currentUser}
        avatarUser={avatarUser}
      />
      <PostFeed />
    </>
  );
};

export default Home;
