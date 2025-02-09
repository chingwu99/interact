'use client'

import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const {
    // isLoading,
    checkAuth,
    user,
    setIsLoading,
  } = useAuth()

  console.log('user', user)

  useEffect(() => {
    // Check if token exists and validate it
    const token = localStorage.getItem('token')
    if (token) {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [checkAuth, setIsLoading])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default AuthGuard
