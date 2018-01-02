import { combineReducers } from 'redux';
import dataReducer from './DataReducer';

export default combineReducers({
	data: dataReducer
});
