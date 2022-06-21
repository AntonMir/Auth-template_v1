import { createContext } from 'react'
import { IUserContext } from '@interfaces/IAuth'

export const UserContext = createContext<IUserContext>({
    userName: '',
    signup: async () => {
        return {
            message: ''
        }
    },
    login: async () => {
        return {
            tokens: {
                access_token: '',
                refresh_token: ''
            },
            name: ''
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