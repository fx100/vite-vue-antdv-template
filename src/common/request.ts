import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from '~/composables/useToken'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    // 携带 Token
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code !== 0) {
      return Promise.reject(new Error(data?.message || data))
    }
    return data?.data || data
  },
  (error) => Promise.reject(error),
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default request as (config: AxiosRequestConfig<any>) => Promise<any>
