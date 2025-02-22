'use client'

import { useMemo } from 'react'
import { format } from 'date-fns'
import { BiCalendar } from 'react-icons/bi'

import useEditModal from '@/hooks/useEditModal'
import type { UserWithFollowersCount, User } from '@/type/user'
import { useFollow } from '@/hooks/useFollow'

import Button from '../Button'

interface UserBioProps {
  avatarUser: UserWithFollowersCount | null
  currentUser: User | null
  isFollowing: boolean
}

const UserBio: React.FC<UserBioProps> = ({ avatarUser, currentUser, isFollowing }) => {
  const editModal = useEditModal()

  const { toggleFollow, isLoading } = useFollow({
    userId: avatarUser?.id as string,
    currentUser,
    isFollowing,
  })

  const createdAt = useMemo(() => {
    if (!avatarUser?.createdAt) {
      return null
    }

    return format(new Date(avatarUser.createdAt), 'MMMM yyyy')
  }, [avatarUser?.createdAt])

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === avatarUser?.id ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            outline={isFollowing}
            disabled={isLoading}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{avatarUser?.name}</p>
          <p className="text-md text-neutral-500">@{avatarUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{avatarUser?.bio}</p>

          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{avatarUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{avatarUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBio
