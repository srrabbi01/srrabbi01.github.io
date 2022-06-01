import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { loginUser } from './redux/actions';
import { auth } from './firebase-config';
import MainComponents from './MainComponents';
import Login from './auth/login.component';
import SignUp from './auth/signup.component';
const loader = document.querySelector('.loader');

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			dispatch(loginUser(currentUser));
		});
	}, []);

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<MainComponents />} />
					<Route path='/signin' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
