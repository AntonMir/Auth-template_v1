/**
 * Миддлвара запросов на север (не аутентификация)
 * Добавляет Access_token для запросов.
 * Если время Access_token вышло производится повторный вход
 */
import Axios from 'axios'
import { IResponseRefresh } from '@interfaces/IResponse'
import config from '@config/config'

// withCredentials - с использованием учетных данных
const axios = Axios.create({
    withCredentials: true,
    baseURL: config.dataServerURL,
})


// Перехват ответа
axios.interceptors.response.use(

    // 1 параметр - если все ок
    (request) => {
        // если все ок, отдаем, то, что есть
        return request
    },

    // 2 параметр - если ошибка
    async (error) => {
        try {
            if (error.response.status >= 400 && error.config && !error.config._isRetry) {
                // обозначаем, что мы уже попытались запросить refresh и повторного запроса не будет
                error.config._isRetry = true

                // если ошибка, то пробуем получить новую пару токенов
                const refreshToken = localStorage.getItem('refreshToken')
                const accessToken = localStorage.getItem('accessToken')

                const response = await Axios.post<IResponseRefresh>(
                    `${config.authServerURL}/api/auth/refresh`,
                    { refresh_token: refreshToken },
                    {
                        withCredentials: true,
                        headers: { Authorization: `Bearer ${accessToken}` },
                    },
                )
                const tokens = response.data

                localStorage.setItem('accessToken', tokens.access_token)
                localStorage.setItem('refreshToken', tokens.refresh_token)

                // повторная попытка запроса
                return axios.request(error.config)
            } else {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('userName')
                localStorage.removeItem('isAuthenticated')
            }
        } catch (error) {
            throw error
        }
    }
)

export default axios