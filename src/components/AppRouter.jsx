import React, {useEffect, useContext} from 'react';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router"
import {AuthContext} from "../context"
import Loader from "../components/UI/Loader/Loader"

const AppRouter = () => {
    const isAuth = Boolean(localStorage.getItem('auth'))
    const navigate = useNavigate()
    const {isLoading} = useContext(AuthContext)

    useEffect(() => {
        if(isAuth) {
            return navigate("/posts")
        }
        return navigate('/login')
    }, [])

    if(isLoading) {
        return <Loader/>
    }

    return (
        isAuth
        ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="/" element={<Navigate replace to="/posts"/>}/>
            </Routes>
        :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="/*" element={<Navigate replace to="/login"/>}/>
            </Routes>

    );
};

export default AppRouter;