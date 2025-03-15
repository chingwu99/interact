import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getBaseUrl } from './api/utils/getBaseUrl'

export async function middleware(request: NextRequest) {
  // 獲取 cookies
  const accessToken = request.cookies.get('accessToken')
  const refreshToken = request.cookies.get('refreshToken')

  // 需要驗證的路徑
  const authRoutes = ['/notifications']
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // 如果是需要驗證的路徑，但沒有任何 token，則重定向到首頁
  if (isAuthRoute && !refreshToken && !accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 如果沒有任何 token 或已有 accessToken，直接放行
  if (!refreshToken || accessToken) {
    return NextResponse.next()
  }

  // 如果只有 refreshToken，嘗試刷新 token
  try {
    // 沒有 accessToken 但有 refreshToken，嘗試刷新 token'
    const BASE_URL = getBaseUrl()

    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken.value}`,
      },
      credentials: 'include',
    })

    if (refreshResponse.ok) {
      const setCookieHeader = refreshResponse.headers.get('Set-Cookie')

      // 刷新 token 成功，從響應體獲取到新的 token'
      // 創建重定向響應，重定向到原始 URL
      const originalUrl = request.nextUrl.clone()
      const response = NextResponse.redirect(originalUrl)

      // 如果後端有設置 cookie，將其傳遞到客戶端
      if (setCookieHeader) {
        response.headers.set('Set-Cookie', setCookieHeader)
      }

      return response
    }

    // 刷新 token 失敗的處理
    if (isAuthRoute) {
      // 如果是需要驗證的路徑，重定向到首頁
      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch (error) {
    // 發生錯誤時的處理
    if (isAuthRoute) {
      // 如果是需要驗證的路徑，重定向到首頁
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}
