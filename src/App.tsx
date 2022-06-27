// navigation
import { Routes, Route, Navigate } from 'react-router-dom'
// React query
import { QueryClient, QueryClientProvider } from 'react-query'
// Context
import { Context } from '@context/Context'
// Auth
import { useContext } from '@hooks/useContext'
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

    const { signup, login, logout, userEmail, userName, isAuthenticated } = useContext()

    // если пользовател авторизован отдаем скрытые страницы иначе переход на сраницу входа
    const appRoutes = isAuthenticated ? privateRoutes : publicRoutes


    return (
        <QueryClientProvider client={queryClient}>
            <Context.Provider
                value={{
                    userName,
                    userEmail,
                    signup,
                    login,
                    logout,
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
            </Context.Provider>
        </QueryClientProvider>
    );
}

export default App;
