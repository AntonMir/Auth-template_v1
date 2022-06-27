/**
 * Миддлвара запросов на север (Аутентификация)
 */
import Axios from 'axios'
import config from '@config/config'

// withCredentials - с использованием учетных данных
const axiosAuth = Axios.create({
    withCredentials: true,
    baseURL: config.authServerURL
})


export default axiosAuth