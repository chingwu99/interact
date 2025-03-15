'use client'

import { useCallback } from 'react'
import { IconType } from 'react-icons'
import { BsDot } from 'react-icons/bs'

import useLoginModal from '@/hooks/useLoginModal'
import type { User } from '@/type/user'

interface SidebarItemProps {
  label: string
  icon: IconType
  href?: string
  onClick?: () => void
  auth?: boolean
  alert?: boolean | null
  currentUser?: User | null
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert, currentUser }) => {
  const loginModal = useLoginModal()

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick()
    }

    if (auth && !currentUser) {
      loginModal.onOpen()
    } else if (href) {
      window.location.href = href
    }
  }, [href, auth, loginModal, onClick, currentUser])

  return (
    <div onClick={handleClick} className="flex flex-row pl-2 lg:pl-0 items-center">
      <div
        className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      "
      >
        <Icon size={28} color="white" />
        {alert ? <BsDot className="text-[#906B7F] absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div
        className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? <BsDot className="text-[#906B7F] absolute -top-4 left-0" size={70} /> : null}
      </div>
    </div>
  )
}

export default SidebarItem
