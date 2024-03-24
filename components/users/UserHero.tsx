import Image from "next/image";
// import components
import Avatar from "../Avatar";
// import type
import { UserWithFollowersCount } from "@/types";

interface UserHeroProps {
  avatarUser: UserWithFollowersCount | null;
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ avatarUser, userId }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {avatarUser?.coverImage && (
          <Image
            src={avatarUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4 bg-black rounded-full ">
          <Avatar userId={userId} avatarUser={avatarUser} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
