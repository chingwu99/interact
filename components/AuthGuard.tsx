'use client'

import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return children
}

export default AuthGuard
