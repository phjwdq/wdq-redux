/**
 * @file BaseComponent
 * @author luwenlong
 */

/* eslint-disable */
import {Component} from 'react'
import PropTypes from 'prop-types'
import {is, List, Map} from 'immutable'

export default class BaseComponent extends Component {
    static contextTypes = {
        allData: PropTypes.object.isRequired,
    }

    constructor(props, context, updater) {
        super(props, context, updater)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {}
        const thisState = this.state || {}

        nextProps = nextProps || {}
        nextState = nextState || {}

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length
            || Object.keys(thisState).length !== Object.keys(nextState).length
        ) {
            return true
        }

        // props
        for (let key in nextProps) {
            let type = this._type(thisProps[key])

            // 字典
            if (type === 'object') {
                if (!is(Map(thisProps[key]), Map(nextProps[key]))) {
                    return true
                }
            }
            else if(type === 'array') {
                if (!is(List(thisProps[key]), List(nextProps[key]))) {
                    return true
                }
            }
            // 基本类型
            else {
                if (thisProps[key] !== nextProps[key]) {
                    return true
                }
            }
        }

        // state
        for (let key in nextState) {
            let type = this._type(thisState[key])

            // 字典
            if (type === 'object') {
                if (!is(Map(thisState[key]), Map(nextState[key]))) {
                    return true
                }
            }
            else if (type === 'array') {
                if (!is(List(thisState[key]), List(nextState[key]))) {
                    return true
                }
            }
            // 基本类型
            else {
                if (thisState[key] !== nextState[key]) {
                    return true
                }
            }
        }

        return false
    }

    _type(param) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
    }
}
