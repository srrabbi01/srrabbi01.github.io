import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions';

export const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const handleLogout = () => {
		if (user) {
			signOut(auth);
			dispatch(logoutUser());
			navigate('/signin');
		} else navigate('/signin');
	};

	return (
		<button className='btn btn-sm btn-danger ms-2' onClick={handleLogout}>
			{user ? 'Logout' : 'Login'}
		</button>
	);
};
