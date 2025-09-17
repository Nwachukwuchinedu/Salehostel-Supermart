import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Token management
const TOKEN_KEY = 'saleshostel_token'
const REFRESH_TOKEN_KEY = 'saleshostel_refresh_token'

const getToken = () => Cookies.get(TOKEN_KEY)
const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY)
const setToken = (token) => Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' })
const setRefreshToken = (token) => Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 30, secure: true, sameSite: 'strict' })
const removeTokens = () => {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          })

          const { token, refreshToken: newRefreshToken } = response.data.data
          setToken(token)
          setRefreshToken(newRefreshToken)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        removeTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials, role = 'customer') => {
        set({ isLoading: true, error: null })
        
        try {
          const endpoint = role === 'customer' ? '/customer/auth/login' : `/${role}/auth/login`
          const response = await api.post(endpoint, credentials)
          
          const { user, token, refreshToken } = response.data.data
          
          // Store tokens
          setToken(token)
          setRefreshToken(refreshToken)
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
          
          toast.success(`Welcome back, ${user.firstName}!`)
          return { success: true, user }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed'
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null 
          })
          toast.error(errorMessage)
          return { success: false, error: errorMessage }
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await api.post('/customer/auth/register', userData)
          const { user, token, refreshToken } = response.data.data
          
          // Store tokens
          setToken(token)
          setRefreshToken(refreshToken)
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
          
          toast.success(`Welcome to SalesHostel, ${user.firstName}!`)
          return { success: true, user }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          toast.error(errorMessage)
          return { success: false, error: errorMessage }
        }
      },

      logout: async () => {
        set({ isLoading: true })
        
        try {
          const refreshToken = getRefreshToken()
          const { user } = get()
          
          if (user?.role && refreshToken) {
            const endpoint = user.role === 'customer' ? '/customer/auth/logout' : `/${user.role}/auth/logout`
            await api.post(endpoint, { refreshToken })
          }
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          // Clear tokens and state regardless of API call success
          removeTokens()
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          })
          toast.success('Logged out successfully')
        }
      },

      checkAuth: async () => {
        const token = getToken()
        if (!token) {
          set({ isAuthenticated: false, user: null })
          return
        }

        set({ isLoading: true })
        
        try {
          // Try to get user profile to verify token
          const response = await api.get('/auth/profile')
          const user = response.data.data
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
        } catch (error) {
          // Token is invalid, clear everything
          removeTokens()
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          })
        }
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null })
        
        try {
          const { user } = get()
          const endpoint = user.role === 'customer' ? '/customer/profile' : `/${user.role}/auth/profile`
          const response = await api.put(endpoint, profileData)
          
          const updatedUser = response.data.data
          set({ 
            user: updatedUser, 
            isLoading: false,
            error: null 
          })
          
          toast.success('Profile updated successfully')
          return { success: true, user: updatedUser }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Profile update failed'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          toast.error(errorMessage)
          return { success: false, error: errorMessage }
        }
      },

      changePassword: async (passwordData) => {
        set({ isLoading: true, error: null })
        
        try {
          const { user } = get()
          const endpoint = user.role === 'customer' ? '/customer/auth/change-password' : `/${user.role}/auth/change-password`
          await api.put(endpoint, passwordData)
          
          set({ isLoading: false, error: null })
          toast.success('Password changed successfully')
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Password change failed'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          toast.error(errorMessage)
          return { success: false, error: errorMessage }
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null })
        
        try {
          await api.post('/auth/forgot-password', { email })
          
          set({ isLoading: false, error: null })
          toast.success('Password reset instructions sent to your email')
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to send reset instructions'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          toast.error(errorMessage)
          return { success: false, error: errorMessage }
        }
      },

      resetPassword: async (token, password) => {
        set({ isLoading: true, error: null })
        
        try {
          await api.post('/auth/reset-password', { token, password })
          
          set({ isLoading: false, error: null })
          toast.success('Password reset successfully')
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Password reset failed'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          toast.error(errorMessage)
          return { success: false, error: errorMessage }
        }
      },

      clearError: () => set({ error: null }),

      // Utility functions
      hasRole: (role) => {
        const { user } = get()
        return user?.role === role
      },

      hasAnyRole: (roles) => {
        const { user } = get()
        return roles.includes(user?.role)
      },

      isAdmin: () => get().hasRole('admin'),
      isSupplier: () => get().hasRole('supplier'),
      isStaff: () => get().hasRole('staff'),
      isCustomer: () => get().hasRole('customer'),
    }),
    {
      name: 'saleshostel-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Export the configured axios instance for use in other parts of the app
export { api }