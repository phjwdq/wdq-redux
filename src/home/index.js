/**
 * @file 详情页
 * @author wdq
 */

/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import BaseComponent from '../common/util/BaseComponent'
import qs from 'qs'

const query = qs.parse(window.location.search.slice(1))
const ua = navigator.userAgent.toLowerCase()
const PHONE_REG = /^1(3|4|5|6|7|8|9)\d{9}$/
let timer = null
const adapter = x => x * (parseFloat(document.documentElement.style.fontSize) || 46.875) / 46.875

export default class Home extends BaseComponent {
    static contextTypes = {
        allData: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)

        this.state = {

        }

        this._onBridgeReady = this._onBridgeReady.bind(this)
    }

    render () {
        return (
            <div>jkkkkjjkjkjjddfkfdkdfsjsfdjksjk</div>
        )
    }

    componentDidMount() {
        const {home} = this.context.allData
        if (!home.infosList) {
            this.context.allData.infos({pid: query.pid})
        }
    }

    // 微信公众号支付
    _onBridgeReady(wxPub) {
        const me = this

        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                appId: wxPub.appId, // 公众号名称，由商户传入
                timeStamp: wxPub.timeStamp, // 时间戳，自1970年以来的秒数
                nonceStr: wxPub.nonceStr, // 随机串
                package: wxPub.package,
                signType: 'MD5', // 微信签名方式：
                paySign: wxPub.paySign // 微信签名
            },
            function (res) {
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。


                }
                else if (res.err_msg == 'get_brand_wcpay_request:cancel') {

                }
                else {

                }
            }
        )
    }
}
