import axios from 'axios'

import { getBaseUrl } from '../utils/getBaseUrl'

const BASE_URL = getBaseUrl()

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 添加響應攔截器處理 token 過期
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 如果是 401 錯誤且不是重試請求
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 嘗試刷新 token，瀏覽器會自動處理新的 cookie
        await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        )

        // token 刷新成功，重試原始請求
        return api(originalRequest)
      } catch (refreshError) {
        // token 刷新失敗需要重新登入

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
