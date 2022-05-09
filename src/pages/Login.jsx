import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput"
import MyButton from "../components/UI/button/MyButton"
import {AuthContext} from "../context"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const {setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        navigate('/posts')
    }
    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput placeholder="Введите логин" type="text"/>
                <MyInput placeholder="Введите пароль" type="password"/>
                <MyButton>
                    Войти
                </MyButton>
            </form>
        </div>
    );
};

export default Login;