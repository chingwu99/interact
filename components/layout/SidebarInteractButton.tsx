'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { FaFeatherAlt } from 'react-icons/fa'

import type { User } from '@/services/user/type'
import useLoginModal from '@/hooks/useLoginModal'
import { useAuth } from '@/hooks/useAuth'

interface SidebarInteractButtonProps {
  currentUser?: User | null
}

const SidebarInteractButton: React.FC<SidebarInteractButtonProps> = ({ currentUser }) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const { isInitialized } = useAuth()

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen(isInitialized)
    }

    router.push('/')
  }, [loginModal, router, currentUser, isInitialized])

  return (
    <div onClick={onClick} className="    pl-2 lg:pl-0">
      <div
        className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-[#906B7F]
        hover:bg-opacity-80 
        transition 
        cursor-pointer
    
      "
      >
        <FaFeatherAlt size={24} color="white" />
      </div>
      <div
        className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-[#906B7F]
        hover:bg-opacity-90 
        cursor-pointer
      "
      >
        <p
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          interact
        </p>
      </div>
    </div>
  )
}

export default SidebarInteractButton
