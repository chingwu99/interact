"use client";

import { UserWithFollowersCount } from "@/types";
import { format } from "date-fns";
import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";

interface UserBioCreatedAtProps {
  fetchedUser: UserWithFollowersCount | null;
}

const UserBioCreatedAt: React.FC<UserBioCreatedAtProps> = ({ fetchedUser }) => {
  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);
  return (
    <div
      className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
    >
      <BiCalendar size={24} />
      <p>Joined {createdAt}</p>
    </div>
  );
};

export default UserBioCreatedAt;
