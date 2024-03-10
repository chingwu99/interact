"use client";

// import { signOut } from 'next-auth/react';
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

// import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarInteractButton from "./SidebarInteractButton";

const Sidebar = () => {
  // const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      // alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: "Profile",
      href: "/users/123",
      // href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full  md:pr-6 ">
      <div className="flex flex-col">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              // alert={item.alert}
              // auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          <SidebarItem icon={BiLogOut} label="Logout" />
          {/* {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />} */}
          <SidebarInteractButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
