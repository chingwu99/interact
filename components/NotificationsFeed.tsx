"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import type
import { Notification } from "@prisma/client";

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
          <Image
            alt="Logo"
            src="/images/components/layout/logo.svg"
            quality={100}
            height="50"
            width="50"
          />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
