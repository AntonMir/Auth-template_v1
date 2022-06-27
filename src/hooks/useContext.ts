/**
 * Описание методов и состояний контекста
 */
import { useState, useCallback } from 'react'
import { IResponseLogin } from '@interfaces/IResponse'
import axiosAuth from '@middleware/AxiosAuth'
// import config from '@config/config'

export const useContext = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName') ?? '')
    const [userEmail, setUserEmail] = useState(localStorage.getItem('email') ?? '')
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated') ?? '')
    
    // REGISTRATION=================================================
    const signup = useCallback(async (name: string ,email: string, password: string) => {
        const response = await axiosAuth.post(
            '/api/auth/signup', 
            {name, email, password })
        return response.data
    }, [])

    // LOGIN=================================================
    const login = useCallback(async (email: string, password: string) => {
        const response = await axiosAuth.post<IResponseLogin>(
            '/api/auth/login', 
            { email, password })

        const { tokens, name } = response.data

        setUserName(name)
        setUserEmail(email)
        setIsAuthenticated(!!tokens.access_token)

        localStorage.setItem('userName', name)
        localStorage.setItem('email', email)
        localStorage.setItem('accessToken', tokens.access_token)
        localStorage.setItem('refreshToken', tokens.refresh_token)
        localStorage.setItem('isAuthenticated', JSON.stringify(!!tokens.access_token))

        return response.data
    }, [])

    // LOGUOT=================================================
    const logout = useCallback(() => {
        setUserName('')
        setUserEmail('')
        setIsAuthenticated(false)

        localStorage.removeItem('userName')
        localStorage.removeItem('email')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('isAuthenticated')
    }, [])
  

    return {
        signup,
        login,
        logout,
        userEmail,
        userName,
        isAuthenticated,
    }
}