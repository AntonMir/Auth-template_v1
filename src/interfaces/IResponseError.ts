/**
 * Интерфйс для ответа от сервера
 */
export interface IResponseError {
    message: string
    name: string
    code: string
    config: {
        baseUrl: string
        headers: {
            Authorization: string
        }
        url: string
        _isRetry: boolean
    }
    requires: XMLHttpRequest
    response: {
        status: number
        data: {
            message: string
        }
    }
}