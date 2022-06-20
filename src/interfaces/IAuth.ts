export interface IResponseTokens {
    access_token:   string
    refresh_token:  string
}

export interface IUserContext {
    userName: string
    login: (name: string, password: string) => Promise<IResponseTokens>
    logout: () => void
    refresh: (access_token: string, refresh_token: string) => Promise<IResponseTokens>
    isAuthenticated: boolean
}