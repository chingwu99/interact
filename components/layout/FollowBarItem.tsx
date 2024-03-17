import getUserById from "@/app/actions/getUserById";
import Avatar from "../Avatar";

interface FollowBarItemProps {
  user: Record<string, any>;
}

const FollowBarItem: React.FC<FollowBarItemProps> = async ({ user }) => {
  const fetchedUser = await getUserById({ userId: user.id });

  return (
    <div key={user.id} className="flex flex-row gap-4">
      <Avatar userId={user.id} fetchedUser={fetchedUser} />

      <div className="flex flex-col">
        <p className="text-white font-semibold text-sm">{user.name}</p>
        <p className="text-neutral-400 text-sm">@{user.username}</p>
      </div>
    </div>
  );
};

export default FollowBarItem;
