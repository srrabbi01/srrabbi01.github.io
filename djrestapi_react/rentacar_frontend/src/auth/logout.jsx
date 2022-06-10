import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
	const navigate = useNavigate();
	const access = localStorage.getItem('access_token');
	const userId = localStorage.getItem('user_id');
	const handleLogout = () => {
		if (access && userId) {
			localStorage.removeItem('access_token');
			localStorage.removeItem('user_id');

			navigate('/signin');
		} else navigate('/signin');
	};

	return (
		<button
			className={`btn ${
				access && userId ? 'btn-danger' : 'btn-primary'
			} ms-2 mt-2 text-uppercase`}
			onClick={handleLogout}>
			{access && userId ? 'Logout' : 'Login'}
		</button>
	);
};
