/**
 * @file createStore
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

/* eslint-disable */
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger' //正式一般不需要logger
import rootReducer from './reducers'

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk,
        createLogger(),
        routerMiddleware(createHistory()),
    ),
)(createStore)

export default initialState => createStoreWithMiddleware(rootReducer, initialState)
