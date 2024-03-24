// import actions
import getUserById from "@/app/actions/getUserById";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import components
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import PostFeed from "@/components/posts/PostFeed";

interface IParams {
  userId?: string;
}

const UserView = async ({ params }: { params: IParams }) => {
  const { userId } = params;

  const avatarUser = await getUserById(params);
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header showBackArrow label={avatarUser?.name as string} />
      <UserHero userId={userId as string} avatarUser={avatarUser} />
      <UserBio
        userId={userId as string}
        avatarUser={avatarUser}
        currentUser={currentUser}
      />
      <PostFeed userId={userId} />
    </>
  );
};

export default UserView;
