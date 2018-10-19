/**
 * @file BaseAction
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */
/* eslint-disable */
import axios from 'axios'
import cookie from 'cookie'
import {OS, BROWSER} from './platform'

const request = (type, params) => {return {type, params}}
const receive = (type, data) => {return {type, data}}

const cookies = cookie.parse(document.cookie)
const global = {
    uid: cookies && cookies.inno_uid || window.uid,
    openid: cookies && cookies.inno_openid || window.openid,
    channel: 'weixin',
    platform: OS.ios ? 'ios' : OS.android ? 'android' : '',
    vesion: '1.0'
}

/**
 * @description async action
 *
 * @param reqAction 发起请求的action
 * @param resAction 接收响应的action
 * @param url       发起请求的url
 * @param method    发起请求的方式 get|post
 * @param params    发起请求的请求参数
 */
export default function baseAction(reqAction, resAction, url, method, params) {
    return async dispatch => {
        dispatch(request(reqAction, params))
        try {
            let res = void 0
            if (/api\/user\/user/ig.test(url)) {
                res = await axios({
                    method: 'post',
                    url: url,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: params,
                    responseType: 'json',
                    transformRequest: [function (data) {
                        let formData = new FormData()

                        for (let prop in data) {
                            formData.append(prop, data[prop])
                        }

                        return formData
                    }],
                    transformResponse: [function (data) {
                        return data
                    }]
                })
            }
            else {
                if (method.toLowerCase() === 'get') {
                    res = await axios.get(url, {params})
                }
                else {
                    res = await axios[method](url, params)
                }
            }

            dispatch(receive(resAction, {...res, params}))
        }
        catch (err) {
            dispatch(receive(resAction, {status: -2, code: -2, errmsg: '网络错误，请重试'}))
        }
    }
}

axios.interceptors.request.use(
    config => {

        config.data = {...global, ...config.data}

        config.timeout = 150000

        // 支持java非微信环境下打开 仅限首页
        const {pathname, search} = window.location
        const allow = pathname === '/mobile/pro'

        if (allow && search.includes('web=1')) {
            config.url += config.url.includes('?')
                ? '&debug=1'
                : '?debug=1'
        }

        // 开发环境
        if (process.env.APP_ENV === 'dev') {
            config.url += config.url.includes('?')
                ? '&debug=1'
                : '?debug=1'
        }

        return config

    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => response.data)
