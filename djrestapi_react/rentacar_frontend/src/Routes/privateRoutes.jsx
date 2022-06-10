import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

export const PrivateRoute = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const getAuthUser = async (setUser) => {
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
				.get(`https://demo.rabbi.my.id/api/user/${userId}`, authHeader)
				.then((response) => {
					if (response.status === 200) {
						setUser(response.data);
					}
				});
		}
		setLoading(false);
	};

	useEffect(() => {
		getAuthUser(setUser);
	}, []);

	if (loading) return <Loading />;

	return user ? children : <Navigate to='/signin' replace />;
};
