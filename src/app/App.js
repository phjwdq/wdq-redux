/**
 * @file App smart component
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

/* eslint-disable */
import React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import cookie from 'cookie'
import * as actions from './actions'
import qs from 'qs'

import '../common/styl/global.styl'

const cookies = cookie.parse(document.cookie)

class App extends Component {
    constructor(props) {
        super(props)
    }

    static childContextTypes = {
        allData: PropTypes.object.isRequired,
    }

    getChildContext() {
        return {allData: this.props}
    }

    render() {
        return (
            <div className="inno">
                {this.props.children}
            </div>
        )
    }

    componentWillMount() {
        const {result} = qs.parse(window.location.search.slice(1))

        if (result) {
            this.props.history.push(`/result/${result}`)
        }
    }

    componentDidMount() {
        if (!/reserv/.test(this.props.location.pathname)) {
            require('fastclick').attach(document.body)
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions.default, dispatch)
}

export default connect(state => state, mapDispatchToProps)(App)
