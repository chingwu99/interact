import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useLoginModal from '@/hooks/useLoginModal'
import { followClientService } from '@/services/follow/client'
import type { User } from '@/type/user'

interface UseFollowProps {
  userId: string
  currentUser: User | null
  isFollowing: boolean
}

export const useFollow = ({ userId, currentUser, isFollowing }: UseFollowProps) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const [isLoading, setIsLoading] = useState(false)

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      setIsLoading(true)
      const request = isFollowing
        ? () => followClientService.unfollowUser({ userId })
        : () => followClientService.followUser({ userId })

      await request()

      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')

      window.location.href = '/'
    } finally {
      setIsLoading(false)
    }
  }, [userId, isFollowing, loginModal, router, currentUser])

  return {
    isFollowing,
    toggleFollow,
    isLoading,
  }
}
