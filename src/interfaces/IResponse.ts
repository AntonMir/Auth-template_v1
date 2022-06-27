export interface IResponseLogin {
    tokens: {
        access_token:   string
        refresh_token:  string
    }
    name:   string
}

export interface IResponseRefresh {
    access_token:   string
    refresh_token:  string
}
