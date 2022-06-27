import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Context } from '@context/Context'
import '@styles/header.css'



const Header: React.FC = () => {
    // const [globalPage, setGlobalPage] = useState(localStorage.getItem('globalPage') ?? 'clients')

    const auth = useContext(Context)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     localStorage.setItem('globalPage', globalPage)
    // }, [globalPage])

    if (auth.isAuthenticated) {
        return (
            <HeaderStyled>
                {/* <Navbar>
                    <button
                        className='clients-btn'
                        onClick={() => {
                            setGlobalPage('clients')
                            navigate(RoutePaths.CLIENTS_LIST)
                        }}
                        style={globalPage === 'clients' ? { backgroundColor: '#1890ff', color: '#fff' } : {}}
                    >Клиенты</button>
                    <button
                        className='devices-btn'
                        onClick={() => {
                            setGlobalPage('devices')
                            navigate(RoutePaths.DEVICES_LIST)
                        }}
                        style={globalPage === 'devices' ? { backgroundColor: '#1890ff', color: '#fff' } : {}}
                    >Устройства</button>
                </Navbar> */}
                <div>{auth.userName}</div>
                <button onClick={auth.logout}>Выход</button>
            </HeaderStyled>
        )
    }

    return (
        <>
            {/* <button onClick={() => navigate(RoutePaths.LOGIN)}></button> */}
            {/* <button onClick={() => navigate(RoutePaths.LOGIN)}>Вход</button> */}
        </>
    )
}

export default Header

const HeaderStyled = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 5%;
    height: 48px;
    background-color: #000;

    > * {
        /* margin: 0 15px; */
        color: #fff;
    }

    button {
        background-color: #000;
        cursor: pointer;
        height: 100%;
        transition: background-color 0.2s linear, color 0.2s linear;
        margin: 0;
        padding: 0 15px;
        color: #fff;

        :hover {
            background-color: #fff;
            color: #000;
        }
    }

    > img {
        height: auto;
        width: 100%;
        margin: 0 15px;
    }

    @media (max-width: 440px) {
        height: 80px;
        padding: 0 5% 0 8%;
    }
`

const Navbar = styled.div`
    flex: 1;
    color: #fff;

    > * {
        margin: 0 15px;
        color: #fff;
    }

    > button {
        background-color: #000;
        cursor: pointer;
        height: 100%;
        transition: background-color 0.2s linear, color 0.2s linear;
        margin: 0 !important;
        padding: 11px 22px;
        color: #9ea6ad;
        font-size: 16px;

        :hover {
            background-color: #1890ff;
            color: #fff;
        }

        @media (max-width: 440px) {
            padding: 5px 22px;
            margin: 1px 0 !important;
        }
    }

    > .devices-btn {
        margin-top: 5px;
    }
`