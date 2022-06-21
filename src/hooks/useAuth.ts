import { useState, useCallback } from 'react'
import { ILoginResponse, IRefreshResponse } from '@interfaces/IAuth'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import axios from '@middleware/Axios'
import config from '@config/config'

export const useAuth = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') ?? '')
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') ?? '')
    const [userName, setUserName] = useState( localStorage.getItem('userName') ?? '')
    const [email, setEmail] = useState(localStorage.getItem('email') ?? '')
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated') ?? '')
    const navigate = useNavigate()
    
    // REGISTRATION=================================================
    const signup = useCallback(async (name: string ,email: string, password: string) => {
        const response = await axios.post(
            '/api/auth/signup', 
            {name, email, password })
        return response.data
    }, [navigate])

    // LOGIN=================================================
    const login = useCallback(async (email: string, password: string) => {
        const response = await axios.post<ILoginResponse>(
            '/api/auth/login', 
            { email, password })

        const { tokens, name } = response.data

        setUserName(name)
        setEmail(email)
        setAccessToken(tokens.access_token)
        setRefreshToken(tokens.refresh_token)
        setIsAuthenticated(!!tokens.access_token)

        localStorage.setItem('userName', name)
        localStorage.setItem('email', email)
        localStorage.setItem('accessToken', tokens.access_token)
        localStorage.setItem('refreshToken', tokens.refresh_token)
        localStorage.setItem('isAuthenticated', JSON.stringify(!!tokens.access_token))

        return response.data
    }, [navigate])

    // LOGUOT=================================================
    const logout = useCallback(() => {
        setUserName('')
        setEmail('')
        setAccessToken('')
        setRefreshToken('')
        setIsAuthenticated(false)

        localStorage.removeItem('userName')
        localStorage.removeItem('email')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('isAuthenticated')
    }, [])

    // REFRESH=================================================
    const refresh = useCallback(async (refreshToken: string, accessToken?: string) => {
        const response = await axios.post<IRefreshResponse>(
            `/api/auth/refresh`,
            { refresh_token: refreshToken },
            {
                withCredentials: true,
                headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' },
            },
        )
        const tokens = response.data

        setAccessToken(tokens.access_token)
        setRefreshToken(tokens.refresh_token)

        localStorage.setItem('accessToken', tokens.access_token)
        localStorage.setItem('refreshToken', tokens.refresh_token)

        return tokens
    }, [])

    return {
        signup,
        login,
        logout,
        refresh,
        userName,
        accessToken,
        refreshToken,
        isAuthenticated,
    }
}