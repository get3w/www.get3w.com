import * as _ from 'lodash';
import * as types from '../constants/actionTypes';
import * as states from '../constants/states';
import * as utils from '../lib/utils';

const initialState: states.OrgState = null;

export default function orgAppState(state = initialState, action) {
	switch (action.type) {
		case types.ORG_CHANGE:
			return _.assign({}, state, action.orgState);

		default:
			return state;
	}
}
