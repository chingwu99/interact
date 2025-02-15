'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import Image from 'next/image'

import type { UserWithFollowersCount, User } from '@/services/user/type'

interface AvatarProps {
  isLarge?: boolean
  hasBorder?: boolean
  avatarUser: UserWithFollowersCount | User | null
}

const Avatar: React.FC<AvatarProps> = ({ isLarge, hasBorder, avatarUser }) => {
  const router = useRouter()

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation()

      const url = `/users/${avatarUser?.id}`

      router.push(url)
    },
    [router, avatarUser?.id]
  )

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
        min-w-12
        min-h-12
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        alt="Avatar"
        onClick={onClick}
        src={avatarUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  )
}

export default Avatar
