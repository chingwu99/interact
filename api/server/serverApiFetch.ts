import { cookies } from 'next/headers'

interface FetchOptions {
  requireAuth?: boolean
  headers?: Record<string, string>
  cache?: 'no-store' | 'force-cache'
}

export async function serverApiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = false, ...fetchOptions } = options

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  try {
    const url = `${BASE_URL}${endpoint}`
    const cookieStore = await cookies()

    let headers = {
      ...fetchOptions.headers,
    }

    if (requireAuth) {
      const accessToken = cookieStore.get('accessToken')
      const refreshToken = cookieStore.get('refreshToken')

      if (!accessToken && !refreshToken) {
        return null as T
      }

      headers = {
        ...headers,
        Cookie: `accessToken=${accessToken?.value}; refreshToken=${refreshToken?.value}`,
      }
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    if (!response.ok) {
      return null as T
    }

    return response.json()
  } catch (error) {
    console.error('Server fetch error:', error)
    return null as T
  }
}
