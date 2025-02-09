// 定義基本的 API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// ISR GET
export async function getIsrData(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    next: { revalidate: 3600 }, // 設定快取時間（秒）
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

// SSG GET
export async function getSsgData(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'force-cache',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

//  SSR GET
export async function getSsrData(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch dynamic data')
  }

  return response.json()
}
