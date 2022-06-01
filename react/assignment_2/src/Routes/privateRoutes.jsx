import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../redux/actions';
import { auth } from '../firebase-config';
import Loading from '../components/Loading';

export const PrivateRoute = ({ children }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			dispatch(loginUser(currentUser));
			setLoading(false);
		});
	}, [dispatch]);
	if (loading) return <Loading />;

	return user ? children : <Navigate to='/signin' replace />;
};
