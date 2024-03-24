import { redirect } from "next/navigation";
// import actions
import getCurrentUser from "../actions/getCurrentUser";
import getNotificationsByUserId from "../actions/getNotificationsByUserId";
// import types
import { Notification } from "@prisma/client";
// import components
import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

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
