import Header from "@/components/Header";

import getCurrentUser from "../actions/getCurrentUser";
import getNotificationsByUserId from "../actions/getNotificationsByUserId";
import NotificationsFeed from "@/components/NotificationsFeed";
import { Notification } from "@prisma/client";
import { redirect } from "next/navigation";

const Notifications = async () => {
  const currentUser = await getCurrentUser();

  let fetchedNotifications: Notification[] = [];

  if (!currentUser) {
    return redirect("/");
  }

  if (currentUser) {
    fetchedNotifications = await getNotificationsByUserId({
      userId: currentUser?.id,
    });
  }

  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed fetchedNotifications={fetchedNotifications} />
    </>
  );
};

export default Notifications;
