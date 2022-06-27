import React, { useState, useContext, ChangeEvent } from 'react'
// navigation
import { Link } from 'react-router-dom'
// ANTD
import { Button, Form, Input, message } from 'antd'
// cache requests
import { useQuery } from 'react-query'
// context
import { Context } from '@context/Context'
// auth validation
import { emailValidate, passValidate } from '@utils/validation'
// interfaces
import { IResponseLogin } from '@interfaces/IResponse'
import { IResponseError } from '@interfaces/IResponseError'
// styles
import styled from 'styled-components'

const LoginForm: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const auth = useContext(Context)

  
    const { isLoading, refetch } = useQuery<IResponseLogin, IResponseError>(
        'login',
        async () => {
            return await auth.login(form.email, form.password)
        },
        {
            enabled: false,
            retry: 0,
            onSuccess: (res) => {
                // поприветствуем пользователя в случае успешного входа
                message.success(`Добро пожаловать, ${res.name}!`)
            },
            onError: (err) => {
                // если ошибка выводим ее пользователю
                message.error(err.response.data.message)
            },
        }
    )

    const changeUserData = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = () => {
        // функция дял проверки корректности введенных данных
        if(!emailValidate(form.email)) return message.error('Введен некорректный Email!')
        if(!passValidate(form.password)) return message.error('Пароль должен иметь длинну от 4 до 10 символов и содержать только ЛАТИНСКИЕ символы!')
        return refetch()
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
                <Input.Password type="password" name="password" onChange={changeUserData} />
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

                <LinkStyled type="link" to="../registration">Нет аккаунта? Зарегистрируйтесь!</LinkStyled>
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