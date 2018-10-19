/**
 * @file CRM
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

/* eslint-disable */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store' //有数据 用到store
import AppRouter from './routes'

window.MINIP = window.__wxjs_environment === 'miniprogram'

wx.ready(() => {
    window.MINIP = window.__wxjs_environment === 'miniprogram'

    wx.onMenuShareTimeline({
        title: '叮当保',
        link: window.location.href,
        imgUrl: shareLogo,
        success: function suc() {},
        cancel: function fail() {}
    })
    wx.onMenuShareAppMessage({
        title: '叮当保',
        desc: '智能所以专业，帮你轻松驾驭家庭保险',
        link: window.location.href,
        imgUrl: shareLogo,
        type: '',
        dataUrl: '',
        success: function suc() {},
        cancel: function fail() {}
    })
})

const initialState = {
    home: {}
}

const store = configureStore(initialState)
// Provider 需要babel解析

render(
    <Provider store={store}>
        {AppRouter}
    </Provider>,
    document.getElementById('app')
)

if (module.hot) {
    module.hot.accept()
}
