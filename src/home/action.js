/**
 * @file LoginAction
 * @author hxy
 */

/*eslint-disable*/
import baseAction from '../common/util/baseAction'
import {ACTIONTYPES, APIS} from './constants'

export function infos(params) {
    return baseAction(
        ACTIONTYPES.REQUEST_GETINFOS,
        ACTIONTYPES.RECEIVE_GETINFOS,
        APIS.infos,
        'post',
        params
    )
}
