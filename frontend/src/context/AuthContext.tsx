'use client'
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react'
import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL

interface AuthContextType {
  user: any
  loading: boolean
  error: string | null
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        console.error('Failed to parse user data from localStorage', e)
        localStorage.removeItem('user') // Remove incorrect data
      }
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])

  const saveAuthData = (accessToken: string, user: any) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    setUser(user)
  }

  const register = async (
    email: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        username,
        password
      })
      const { accessToken, user } = response.data
      saveAuthData(accessToken, user)
      return true
    } catch (err: any) {
      setError(err.response.data.message)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const { accessToken, user } = response.data
      saveAuthData(accessToken, user)
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const refreshToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh-token')
      const { accessToken } = response.data
      const user = JSON.parse(localStorage.getItem('user')!)
      saveAuthData(accessToken, user)
    } catch (err) {
      console.error('Failed to refresh token:', err)
      logout()
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, register, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
