import React, { useState, useContext, ChangeEvent } from 'react'
// navigation
import { Link, useNavigate } from 'react-router-dom'
// ANTD
import { Button, Form, Input, message } from 'antd'
// cache requests
import { useQuery } from 'react-query'
// context
import { Context } from '@context/Context'
// interfaces
import { IResponseError } from '@interfaces/IResponseError'
// auth validation
import { emailValidate, passValidate, nameValidate } from '@utils/validation'
// styled
import styled from 'styled-components'

const LoginForm: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPass: ''})
    const auth = useContext(Context)
    const navigate = useNavigate()


    const { isLoading, refetch } = useQuery<void, IResponseError>(
        'signup',
        async () => {
            return await auth.signup(form.name ,form.email, form.password)
        },
        {
            enabled: false,
            retry: 0,
            onSuccess: () => {
                message.success("Пользователь успешно зарегистрирован!")
                // при успехе регистрации переходим на строницу входа
                navigate(`../login`)
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

    const registerHandler = () => {
        if(!nameValidate(form.name)) return message.error('Имя должно иметь длинну от 2 до 20 символов и содержать только Русские и Латинские символы!')
        if(!emailValidate(form.email)) return message.error('Введен некорректный Email!')
        if(!passValidate(form.password)) return message.error('Пароль должен иметь длинну от 4 до 10 символов и содержать только Латинские символы!')
        if(form.password !== form.confirmPass) return message.error('Пароли не совпадают')
        return refetch()
    }

    
    return (

        <Form>
            <Title>Регистрация</Title>

            <FormInput
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Пожалуйста введите имя пользователя!' }]}
            >
                <Input type="text" name="name" onChange={changeUserData} />
            </FormInput>

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
                <Input.Password type="password" name="password" onChange={changeUserData}/>
            </FormInput>

            <FormInput
                label="Подтвердите пароль"
                name="confirmPass"
                rules={[{ required: true, message: 'Пожалуйста введите пароль повторно' }]}
            >
                <Input.Password type="password" name="confirmPass" onChange={changeUserData} />
            </FormInput>

            <FormBtn>
                <Button 
                    type="primary" 
                    loading={isLoading}
                    onClick={registerHandler}
                >
                    Регистрация
                </Button>
            </FormBtn>

                <LinkStyled type="link" to="../login">Есть аккаунт? Войдите!</LinkStyled>
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