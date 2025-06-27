// Add type definitions for Vite env variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_API_TIMEOUT?: string
  readonly VITE_TOKEN_STORAGE_KEY?: string
  // add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
    this.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'partapay_token')

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          message: errorData.message || 'Request failed',
          status: response.status,
          errors: errorData.errors || {},
        } as ApiError
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw { message: 'Request timeout', status: 408 } as ApiError
        }
        throw { message: error.message, status: 0 } as ApiError
      }
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  setToken(token: string) {
    localStorage.setItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'partapay_token', token)
  }

  removeToken() {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'partapay_token')
  }

  getToken() {
    return localStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || 'partapay_token')
  }
}

export const apiClient = new ApiClient()
export type { ApiResponse, ApiError }
