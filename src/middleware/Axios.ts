import Axios from 'axios'
import { IResponseTokens } from '@interfaces/IAuth'
import config from '@config/config'

// withCredentials - с использованием учетных данных
const axios = Axios.create({
    withCredentials: true,
    baseURL: config.authServerURL,
})

// мидлвара для перехвата запроса
axios.interceptors.request.use((request) => {
    if (!request) {
        request = {}
    }
    if (!request.headers) {
        request.headers = {}
    }

    // для каждого запроса добавляем Access Token
    request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return request
})

// Перехват ответа
axios.interceptors.response.use(
    (request) => {
        // если все ок, отдаем, то, что есть
        return request
    },
    // 2 параметр обрабатывает ошибку
    async (error) => {
        // повторная попытка запроса
        if (error.response.status >= 400 && error.config && !error.config._isRetry) {
            // обозначаем, что мы уже попытались запросить refresh и повторного запроса не будет
            error.config._isRetry = true

            try {

                // если ошибка, то пробуем получить новую пару токенов
                const refreshToken = localStorage.getItem('refreshToken') || ''
                const accessToken = localStorage.getItem('accessToken') || ''

                const response = await Axios.post<IResponseTokens>(
                    `${config.authServerURL}/auth/refresh`,
                    { refresh_token: refreshToken },
                    {
                        withCredentials: true,
                        headers: { Authorization: `Bearer ${accessToken}` },
                    },
                )
                const tokens = response.data

                localStorage.setItem('accessToken', tokens.access_token)
                localStorage.setItem('refreshToken', tokens.refresh_token)

                return axios.request(error.config)
            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('userName')
                localStorage.removeItem('isAuthenticated')
            }
        }
        throw error
    },
)

export default axios