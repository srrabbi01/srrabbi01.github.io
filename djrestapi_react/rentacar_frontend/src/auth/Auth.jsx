import axios from 'axios';

export const getAuthUser = async (setUser) => {
	const token = localStorage.getItem('access_token');
	const userId = localStorage.getItem('user_id');
	const authHeader = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	};
	if (token && userId) {
		await axios
			.get(`http://127.0.0.1:8000/api/user/${userId}`, authHeader)
			.then((response) => {
				setUser(response.data);
			});
	}
};
