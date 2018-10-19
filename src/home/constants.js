/**
 * @file login constants
 * @author hxy
 */

/*eslint-disable*/
import keyMirror from 'keymirror'


console.log(1111, '---', window.apiPath)

export const APIS  = {
    infos: `${window.apiPath}prod/infos`
}

export const ACTIONTYPES = keyMirror({
    REQUEST_GETINFOS: null,
	RECEIVE_GETINFOS: null
})
