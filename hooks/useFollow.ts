'use client'

import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useLoginModal from '@/hooks/useLoginModal'
import { followClientService } from '@/services/follow/client'
import { useAuth } from '@/hooks/useAuth'

interface UseFollowProps {
  userId: string
  initialFollowingIds: string[]
}

export const useFollow = ({ userId, initialFollowingIds }: UseFollowProps) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const { checkAuth } = useAuth()

  const [isFollowing, setIsFollowing] = useState(initialFollowingIds?.includes(userId))

  const toggleFollow = useCallback(async () => {
    if (!userId) {
      return loginModal.onOpen()
    }

    const prevIsFollowing = isFollowing

    try {
      const request = prevIsFollowing
        ? () => followClientService.unfollowUser({ userId })
        : () => followClientService.followUser({ userId })

      // 先更新 UI 狀態
      setIsFollowing((prev) => !prev)

      // 執行請求
      await request()

      // 請求成功後更新
      await checkAuth()
      router.refresh()
      toast.success('Success')
    } catch (error) {
      // 請求失敗時恢復原狀態
      setIsFollowing(prevIsFollowing)

      toast.error('Something went wrong')
    }
  }, [userId, isFollowing, loginModal, router, checkAuth])

  return {
    isFollowing,
    toggleFollow,
  }
}
