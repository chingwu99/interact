'use client'

import { BiLogOut } from 'react-icons/bi'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

import type { User } from '@/services/user/type'
import { useAuth } from '@/hooks/useAuth'

import SidebarItem from './SidebarItem'
import SidebarLogo from './SidebarLogo'
import SidebarInteractButton from './SidebarInteractButton'

interface SidebarProps {
  currentUser?: User | null
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { user: currentUser, logout } = useAuth()
  const router = useRouter()
  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="col-span-1 h-full  md:pr-6 ">
      <div className="flex flex-col">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
              currentUser={currentUser}
            />
          ))}

          {currentUser && (
            <SidebarItem onClick={handleLogout} icon={BiLogOut} label="Logout" currentUser={currentUser} />
          )}
          <SidebarInteractButton currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
