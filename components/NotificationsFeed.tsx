"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import type
import { Notification } from "@prisma/client";
// import icons
import { BsTwitter } from "react-icons/bs";

interface NotificationsFeedProps {
  fetchedNotifications: Notification[];
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({
  fetchedNotifications = [],
}) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
