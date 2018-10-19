/**
 * @file 详情页
 * @author hxy
 */

/*eslint-disable*/
import {ACTIONTYPES} from './constants'
const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONTYPES.REQUEST_GETINFOS:
    	    return Object.assign({}, state, {fetchInfosindex: 'start'})
        case ACTIONTYPES.RECEIVE_GETINFOS:
            try {
                if (+action.data.code === 0) {
                    return Object.assign(
                        {},
                        state,
                        {
                            fetchInfosindex: 'done',
                            infosList: action.data.data,
                            infosMsg: 'ok',
                        }
                    )
                }
                else {
                    return Object.assign(
                        {},
                        state,
                        {
                            fetchInfosindex: 'done',
                            infosMsg: '获取信息失败'
                        }
                    )
                }
            }
            catch (err) {
                return Object.assign(
                    {},
                    state,
                    {
                        fetchInfosindex: 'done',
                        infosMsg: '获取信息失败'
                    }
                )
            }
        default:
            return state
    }
}
