// import useUsers from '@/hooks/useUsers';

import getUsers from "@/app/actions/getUsers";

import Avatar from "../Avatar";
import getUserById from "@/app/actions/getUserById";
import FollowBarItem from "./FollowBarItem";
import { Suspense } from "react";

const FollowBar = async () => {
  // const { data: users = [] } = useUsers();

  const users = await getUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block ">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <FollowBarItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
