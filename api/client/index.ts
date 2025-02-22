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

export default api
