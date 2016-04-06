import * as _ from 'lodash';
import * as types from '../constants/actionTypes';
import * as states from '../constants/states';
import * as utils from '../lib/utils';

const initialState: states.AuthState = utils.Auth.getAuthState();

export default function authAppState(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_LOGIN:
			return _.assign({}, state, action.authState);

    case types.AUTH_LOGOUT:
			return _.assign({}, state, {
        token : "",
        user : null,
        orgs: null,
        orgLeaders: null,
        orgAdmins: null,
        isAnonymous : true
      });

		case types.AUTH_UPDATE_USER:
			return _.assign({}, state, action.user);

		default:
			return state;
	}
}
