import React, { useState, useContext, ChangeEvent } from 'react'
// navigation
import { Link } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { useQuery } from 'react-query'
import { ILoginResponse } from '@interfaces/IAuth'
import { UserContext } from '@context/UserContext'
import styled from 'styled-components'

const LoginForm: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const auth = useContext(UserContext)

  
    const { isLoading, refetch } = useQuery<ILoginResponse, Error>(
        'auth',
        async () => {
            return await auth.login(form.email, form.password)
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

    const changeUserData = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = () => {
        refetch();
    }


    return (

        <Form>
            <Title>Авторизация</Title>

            <FormInput
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Пожалуйста введите email!' }]}
            >
                <Input type="email" name="email" onChange={changeUserData} />
            </FormInput>

            <FormInput
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
            >
                <Input type="password" name="password" onChange={changeUserData} />
            </FormInput>

            <FormBtn>
                <Button 
                    type="primary" 
                    loading={isLoading}
                    onClick={loginHandler}
                >
                    Войти
                </Button>
            </FormBtn>

                <LinkStyled type="link" to="../registration">Нет аккаунта? Зарегистрируйся!</LinkStyled>
        </Form>
    )
}

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`

// фиксируем ширину поля ввода
const FormInput = styled(Form.Item)`
    display: flex;
    justify-content: space-between;

    .ant-form-item-control {
        max-width: 80%;
    }
`

// ширина и отцентровка кнопки
const FormBtn = styled(Form.Item)`
    display: flex;
    justify-content: center;
    .ant-form-item-control {
        max-width: 40%;
        button {
            width: 100%;
        }
    }
`

// отцентровка текста ссылки
const LinkStyled = styled(Link)`
    display: block;
    text-align: center;
`

export default LoginForm