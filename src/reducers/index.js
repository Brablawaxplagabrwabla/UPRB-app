import { combineReducers } from 'redux';
import dataReducer from './DataReducer';
import reloadReducer from './ReloadReducer';

export default combineReducers({
	data: dataReducer,
	reload: reloadReducer
});
