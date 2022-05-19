import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './auth/login.component';
import SignUp from './auth/signup.component';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { loginUser } from './redux/actions';
import { auth } from './firebase-config';
import MainComponent from './MainComponent';
import EmptyList from './components/common/EmptyList';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			dispatch(loginUser(currentUser));
		});
	}, []);

	return (
		<>
			<Routes>
				<Route path='/*' exact element={<MainComponent />} />
				<Route path='/signin' exact element={<Login />} />
				<Route path='/signup' exact element={<SignUp />} />
				<Route path='/pagenotfound' element={<EmptyList />} />
				<Route path='*' element={<Navigate to='/pagenotfound' />} />
			</Routes>
		</>
	);
};

export default App;
