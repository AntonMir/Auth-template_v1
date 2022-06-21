// navigation
import { Routes, Route, Navigate } from 'react-router-dom'
// components 
import Login from '@components/auth/Login'
import Registration from '@components/auth/Registration'
// antd
import { Layout, Row, Card } from 'antd'

const AuthPage: React.FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card style={{ minWidth: '25%'}}>
                    <Routes>
                        <Route path='/login' element={<Login />} key='/login' />
                        <Route path='/registration' element={<Registration />} key='/registration' />
                        <Route path="/*" element={<Navigate replace to='/auth/login' />} />
                    </Routes>
                </Card>
            </Row>
        </Layout>
    )
}


export default AuthPage