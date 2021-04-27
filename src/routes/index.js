import React from 'react'
import { Switch, Route } from 'react-router-dom'

import User from '../views/User'
import Home from '../views/Home'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    return (
        <Switch>
            <Route exact path='/admin'><Home /></Route>
            <Route exact path='/admin/usuarios'><User /></Route>
            <Route exact path='/admin/categorias'>categorias</Route>
            <Route exact path='/admin/palavras'>palavras</Route>
            {/* <Route path='/'>antes</Route> */}
        </Switch>
    )

}