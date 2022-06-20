import { useState, useCallback } from 'react'
import { IResponseTokens } from '@interfaces/IAuth'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import axios from '@middleware/Axios'
import config from '@config/config'

export const useAuth = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') ?? '')
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') ?? '')
    const [userName, setUserName] = useState( localStorage.getItem('userName') ?? '')
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated') ?? '')
    const navigate = useNavigate()

    // LOGIN=================================================
    const login = useCallback(async (username: string, password: string) => {
        const response = await axios.post<IResponseTokens>('/auth', { username, password })

        const tokens = response.data

        setUserName(username)
        setAccessToken(tokens.access_token)
        setRefreshToken(tokens.refresh_token)
        setIsAuthenticated(!!tokens.access_token)

        localStorage.setItem('userName', username)
        localStorage.setItem('accessToken', tokens.access_token)
        localStorage.setItem('refreshToken', tokens.refresh_token)
        localStorage.setItem('isAuthenticated', JSON.stringify(!!tokens.access_token))

        // при успешном логине отправляемся на вкладку, на которой в прошлый раз вышли
        // navigate(`/${localStorage.getItem('globalPage') || 'clients'}`)

        return tokens
    }, [navigate])

    // LOGUOT=================================================
    const logout = useCallback(() => {
        setUserName('')
        setAccessToken('')
        setRefreshToken('')
        setIsAuthenticated(false)

        localStorage.removeItem('userName')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('isAuthenticated')
    }, [])

    // REFRESH=================================================
    const refresh = useCallback(async (refreshToken: string, accessToken?: string) => {
        const response = await axios.post<IResponseTokens>(
            `${config.authServerURL}/auth/refresh`,
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
        login,
        logout,
        refresh,
        userName,
        accessToken,
        refreshToken,
        isAuthenticated,
    }
}