export interface ILoginResponse {
    tokens: {
        access_token:   string
        refresh_token:  string
    }
    name:   string
}

export interface IRefreshResponse {
    access_token:   string
    refresh_token:  string
}

export interface IUserContext {
    userName: string
    signup: (name: string, email: string, password: string) => Promise<any>
    login: (email: string, password: string) => Promise<ILoginResponse>
    logout: () => void
    refresh: (access_token: string, refresh_token: string) => Promise<IRefreshResponse>
    isAuthenticated: boolean
}