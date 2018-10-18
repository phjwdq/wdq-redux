/**
 * @file indexRoutes
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

/* eslint-disable */
import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {hot} from 'react-hot-loader'
import Loadable from 'react-loadable'
import PageLoading from '@components/PageLoading'

// import App from './App'

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '../home'),
    loading: PageLoading
})

const AppRouter = (
    <Router>
        <Route path="/" component={props => (
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
        )} />
    </Router>
)

export default hot(module)(AppRouter)
