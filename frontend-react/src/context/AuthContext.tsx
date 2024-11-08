import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { AuthProps, AuthContextType } from '../utils/Type'


export const AuthContext: any = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => { }
})

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('token'))

  useEffect(() => {
    const handleTokenChange = () => {
      setIsAuthenticated(!!Cookies.get('token'))

      window.addEventListener('storage', handleTokenChange)

      return () => {
        window.removeEventListener('storage', handleTokenChange)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}


