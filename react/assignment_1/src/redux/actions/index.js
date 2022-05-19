export const fbCreate = (submittedData) => {
	return {
		type: 'FB_CREATE',
		payload: submittedData,
	};
};
export const fbDelete = () => {
	return {
		type: 'FB_DELETE',
	};
};

export const loginUser = (user) => {
	return {
		type: 'LOGIN_USER',
		payload: user,
	};
};
export const logoutUser = () => {
	return {
		type: 'LOGOUT_USER',
	};
};
