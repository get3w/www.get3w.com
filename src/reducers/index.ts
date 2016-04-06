import { combineReducers } from 'redux';
import authState from './auth';
import orgState from './org';

const rootReducer = combineReducers({
  authState,
  orgState
});

export default rootReducer;
