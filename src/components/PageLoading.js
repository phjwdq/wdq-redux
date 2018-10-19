/**
 * @file PageLoading
 * @author luwenlong
 * @description loading
 */

/* eslint-disable */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class PageLoading extends Component {
    static contextTypes = {
        allData: PropTypes.object.isRequired,
    }

    constructor (props, context) {
        super(props, context)
    }

    render () {
        return (
            <div>
                <span>数据获取中...</span>
            </div>
        )
    }
}
