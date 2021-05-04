import React from 'react'
import { Switch, Route } from 'react-router-dom'

import User from '../views/User'
import Category from '../views/Categories'
import Words from '../views/Words'
import Home from '../views/Home'
import Jogo from '../views/Jogo'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    return (
        <Switch>
            <Route exact path='/'><Jogo /></Route>
            <Route exact path='/admin'><Home /></Route>
            <Route exact path='/admin/usuarios'><User /></Route>
            <Route exact path='/admin/categorias'><Category /></Route>
            <Route exact path='/admin/palavras'><Words /></Route>
            {/* <Route path='/'>antes</Route> */}
        </Switch>
    )

}