// import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import getUserById from "@/app/actions/getUserById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PostFeed from "@/components/posts/PostFeed";

interface IParams {
  userId?: string;
}

const UserView = async ({ params }: { params: IParams }) => {
  const { userId } = params;

  const fetchedUser = await getUserById(params);
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name as string} />
      <UserHero userId={userId as string} fetchedUser={fetchedUser} />
      <UserBio
        userId={userId as string}
        fetchedUser={fetchedUser}
        currentUser={currentUser}
      />
      <PostFeed userId={userId} />
    </>
  );
};

export default UserView;
