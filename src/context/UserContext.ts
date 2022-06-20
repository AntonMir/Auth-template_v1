import { createContext } from 'react'
import { IUserContext } from '@interfaces/IAuth'

export const UserContext = createContext<IUserContext>({
    userName: '',
    login: async () => {
        return {
            access_token: '',
            refresh_token: '',
        }
    },
    logout: () => {},
    refresh: async () => {
        return {
            access_token: '',
            refresh_token: '',
        }
    },
    isAuthenticated: false,
})