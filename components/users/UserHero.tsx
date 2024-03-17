import Image from "next/image";

import Avatar from "../Avatar";

import { UserWithFollowersCount } from "@/types";

interface UserHeroProps {
  fetchedUser: UserWithFollowersCount | null;
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ fetchedUser, userId }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4 bg-black rounded-full ">
          <Avatar userId={userId} fetchedUser={fetchedUser} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
