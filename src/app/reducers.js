/**
 * @file indexReducer
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import home from '../home/reducer'


export default combineReducers({
    home: home
})
