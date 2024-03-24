"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
// import custom hook
import useLoginModal from "@/hooks/useLoginModal";
import useEditModal from "@/hooks/useEditModal";
// import components
import Button from "../Button";
// import icons
import { BiCalendar } from "react-icons/bi";
// import type
import { User } from "@prisma/client";
import { UserWithFollowersCount } from "@/types";
// import others
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

interface UserBioProps {
  avatarUser: UserWithFollowersCount | null;
  userId: string;
  currentUser: User | null;
}

const UserBio: React.FC<UserBioProps> = ({
  userId,
  avatarUser,
  currentUser,
}) => {
  const router = useRouter();
  const editModal = useEditModal();
  const loginModal = useLoginModal();

  const createdAt = useMemo(() => {
    if (!avatarUser?.createdAt) {
      return null;
    }

    return format(new Date(avatarUser.createdAt), "MMMM yyyy");
  }, [avatarUser?.createdAt]);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      router.refresh();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, isFollowing, userId, router, loginModal]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {avatarUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{avatarUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{avatarUser?.bio}</p>

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
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{avatarUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{avatarUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
