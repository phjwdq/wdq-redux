/**
 * @file createStore
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

/* eslint-disable */
if (process.env.APP_ENV === 'prod') {
    module.exports = require('./store.pro')
}
else {
    module.exports = require('./store.dev')
}
