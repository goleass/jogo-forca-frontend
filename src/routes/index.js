import React from 'react'

import { isAutenticated } from '../auth/index'

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

import User from '../views/User'
import Category from '../views/Categories'
import Words from '../views/Words'
import Home from '../views/Home'
import Jogo from '../views/Jogo'
import Login from '../views/Login'

import ShowCanvasGameProvider from '../context/ShowCanvasGame'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAutenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    )} />
)

// eslint-disable-next-line import/no-anonymous-default-export
const Routes = () => {

    return (
        <BrowserRouter>
            <switch>
                <ShowCanvasGameProvider>
                    <Route exact path='/'><Jogo /></Route>
                    <Route exact path='/login'><Login /></Route>
                    <PrivateRoute exact path='/admin' component={Home}></PrivateRoute>
                    <PrivateRoute exact path='/admin/usuarios' component={User}></PrivateRoute>
                    <PrivateRoute exact path='/admin/categorias' component={Category}></PrivateRoute>
                    <PrivateRoute exact path='/admin/palavras' component={Words}></PrivateRoute>
                </ShowCanvasGameProvider>
            </switch>
        </BrowserRouter>
    )

}

export default Routes