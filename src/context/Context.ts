import { createContext } from 'react'
import { IContext } from '@interfaces/IContext'

export const Context = createContext<IContext>({
    userName: '',
    userEmail: '',
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
    isAuthenticated: false,
})