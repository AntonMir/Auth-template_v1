/**
 * Контекст для всего приложения
 */
import { IResponseLogin } from "@interfaces/IResponse"

export interface IContext {
    userName: string
    userEmail: string
    signup: (name: string, email: string, password: string) => Promise<any>
    login: (email: string, password: string) => Promise<IResponseLogin>
    logout: () => void
    isAuthenticated: boolean
}