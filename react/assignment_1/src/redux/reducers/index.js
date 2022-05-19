import { combineReducers } from 'redux';

const user = (state = null, action) => {
	if (action.type === 'LOGIN_USER') {
		return (state = action.payload);
	}
	if (action.type === 'LOGOUT_USER') {
		return (state = null);
	}
	return state;
};

const allReducers = combineReducers({
	user: user,
});
export default allReducers;
