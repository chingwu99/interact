"use client";

import { UserWithFollowersCount } from "@/types";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarImageProps {
  userId: string;
  fetchedUser: UserWithFollowersCount | null;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ userId, fetchedUser }) => {
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <Image
      fill
      style={{
        objectFit: "cover",
        borderRadius: "100%",
      }}
      alt="AvatarImage"
      onClick={onClick}
      src={fetchedUser?.profileImage || "/images/placeholder.png"}
    />
  );
};

export default AvatarImage;
