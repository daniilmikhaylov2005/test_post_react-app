import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "./UI/button/MyButton"
import {AuthContext} from "../context"

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            {isAuth &&
                <div className="navbar__exit">
                    <MyButton className="navbar__exit_btn" onClick={logout}>Выйти</MyButton>
                </div>
            }
            <div className="navbar__links">
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;