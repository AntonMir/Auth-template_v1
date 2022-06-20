import React, { useState, useContext, ChangeEvent } from 'react'
// navigation
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { useQuery } from 'react-query'
import { IResponseTokens } from '@interfaces/IAuth'
import { UserContext } from '@context/UserContext'
import styled from 'styled-components'

const LoginForm: React.FC = () => {
    const [form, setForm] = useState({ userName: '', password: '' })
    const auth = useContext(UserContext)
    const navigate = useNavigate()

    const changeUserData = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = () => {
        refetch();
    }

    const toRegistration = () => {
        navigate(`./registration`)
    }

    const { isLoading, isError, error, refetch } = useQuery<IResponseTokens, Error>(
        'auth',
        async () => {
            return await auth.login(form.userName, form.password)
        },
        {
            enabled: false,
            retry: 1,
            onSuccess: (res) => {
                message.success("Авторизован!")
            },
            onError: (err) => {
                message.error("Ошибка авторизации!")
            },
        }
    )

    return (

        <Form>
            <Title>Авторизация</Title>
            {isError && <div style={{ color: 'red' }}>{error.message}</div>}
            <Form.Item
                label="Имя пользователя"
                name="name"
                rules={[{ required: true, message: 'Пожалуйста введите имя пользователя!' }]}
                >
                <Input type="text" name="userName" onChange={changeUserData} />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                >
                <Input type="password" name="password" onChange={changeUserData} />
            </Form.Item>
            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isLoading}
                    onClick={loginHandler}
                    >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Link type="link" to="../registration">
                    Нет аккаунта? Зарегистрируйся!
                </Link>
            </Form.Item>
        </Form>
    )
}

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`

export default LoginForm