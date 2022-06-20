// navigation
import { Routes, Route, Navigate } from 'react-router-dom'
// React query
import { QueryClient, QueryClientProvider } from 'react-query'
// Context
import { UserContext } from '@context/UserContext'
// Auth
import { useAuth } from '@hooks/useAuth'
// routes
import { publicRoutes, privateRoutes} from '@routes/Routes'
// antd
import { Layout } from 'antd'
// style
import '@styles/app.css';
import Header from '@components/header/Header'


// Создаем клиента для React query
const queryClient = new QueryClient({
    // ...конфиги для наших query элементов
})

const App: React.FC = () => {

    const { login, logout, refresh, userName, isAuthenticated } = useAuth()

    // если пользовател авторизован отдаем скрытые страницы иначе переход на сраницу входа
    const appRoutes = isAuthenticated ? privateRoutes : publicRoutes


    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider
                value={{
                    userName,
                    login,
                    logout,
                    refresh,
                    isAuthenticated,
                }}
            >
                <Header />
                <Layout style={{height: '100vh'}}>
                    <Routes>
                        {appRoutes.map((route) => <Route path={route.path} element={<route.component />} key={route.path} />)}
                        <Route path="*" element={<Navigate replace to={isAuthenticated ? '/temp' : '/auth'} />} />
                    </Routes>
                </Layout>
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
