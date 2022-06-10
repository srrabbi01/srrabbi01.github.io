import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const Login = () => {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [error, setError] = useState('');
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	// const login = async () => {
	// 	try {
	// 		const user = await signInWithEmailAndPassword(
	// 			auth,
	// 			loginEmail,
	// 			loginPassword,
	// 		);
	// 		if (user) {
	// 			setError('');
	// 			return navigate('/');
	// 		}
	// 	} catch (error) {
	// 		if (error.code === 'auth/invalid-email') {
	// 			setError('Invalid Email Entered !!!');
	// 		} else if (error.code === 'auth/user-not-found') {
	// 			setError('Email not found !!!');
	// 		} else if (error.code === 'auth/wrong-password') {
	// 			setError('Wrong Password Entered !!!');
	// 		} else if (error.code === 'auth/internal-error') {
	// 			setError('Username or Password Empty !!!');
	// 		} else console.log(error);
	// 	}
	// };
	// onAuthStateChanged(auth, (currentUser) => {
	// 	dispatch(loginUser(currentUser));
	// });

	const authData = {
		email: loginEmail,
		password: loginPassword,
	};

	const header = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		let carurl = 'http://127.0.0.1:8000/api/token';
		axios
			.post(carurl, authData, header)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					const token = response.data.access;
					const authDecoded = jwtDecode(token);
					localStorage.setItem('access_token', token);
					localStorage.setItem('user_id', authDecoded.user_id);
					navigate('/');
				}
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};

	return (
		<div className='auth-wrapper'>
			<div className='auth-inner'>
				<form method='post' onSubmit={handleLogin}>
					<h3>Sign In</h3>

					<div className='mb-3'>
						<label>Email address</label>
						<input
							type='email'
							className='form-control'
							placeholder='Enter email'
							value={loginEmail}
							onChange={(e) => {
								setLoginEmail(e.target.value);
							}}
							required
						/>
					</div>

					<div className='mb-3'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							placeholder='Enter password'
							value={loginPassword}
							onChange={(e) => {
								setLoginPassword(e.target.value);
							}}
							required
						/>
					</div>
					<div className='mb-2'>
						<small className='text-danger block'>{error ? error : ''}</small>
					</div>
					<div className='custom-control custom-checkbox mb-3'>
						<input
							type='checkbox'
							className='custom-control-input me-2'
							id='customCheck1'
						/>
						<label className='custom-control-label' htmlFor='customCheck1'>
							Remember me
						</label>
					</div>

					<div className='d-grid'>
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					</div>
					<p className='forgot-password text-right'>
						Don't have an Account <Link to='/signup'>sign up?</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
