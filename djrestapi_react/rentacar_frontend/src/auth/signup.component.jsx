import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
// import {
// 	createUserWithEmailAndPassword,
// 	onAuthStateChanged,
// } from 'firebase/auth';
// import { auth } from '../firebase-config';
// import { loginUser } from '../redux/actions';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [registerRole, setRegisterRole] = useState('');
	const [error, setError] = useState('');
	// const user = useSelector((state) => state.user);
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	// const register = async () => {
	// 	try {
	// 		const user = await createUserWithEmailAndPassword(
	// 			auth,
	// 			registerEmail,
	// 			registerPassword,
	// 		);
	// 		if (user) {
	// 			setError('');
	// 			return navigate('/');
	// 		}
	// 	} catch (error) {
	// 		if (error.code === 'auth/invalid-email') {
	// 			setError('Invalid Email Entered !!!');
	// 		} else if (error.code === 'auth/weak-password') {
	// 			setError('Password should be at least 6 characters !!!');
	// 		} else if (error.code === 'auth/email-already-in-use') {
	// 			setError('Account already exist !!!');
	// 		} else if (error.code === 'auth/internal-error') {
	// 			setError('Username or Password Empty !!!');
	// 		} else console.log(error);
	// 	}
	// };

	// onAuthStateChanged(auth, (currentUser) => {
	// 	dispatch(loginUser(currentUser));
	// });
	const authData = {
		email: registerEmail,
		password: registerEmail,
		role: registerRole,
	};

	const header = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const handleSignup = async (e) => {
		e.preventDefault();
		let carurl = 'http://127.0.0.1:8000/api/user/';
		axios
			.post(carurl, authData, header)
			.then((response) => {
				console.log(response.data);
				// if (response.status === 200) {
				// 	const token = response.data.access;
				// 	const authDecoded = jwtDecode(token);
				// 	localStorage.setItem('access_token', token);
				// 	localStorage.setItem('user_id', authDecoded.user_id);
				// 	navigate('/');
				// }
				axios
					.post('http://127.0.0.1:8000/api/token', authData, header)
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
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};
	return (
		<div className='auth-wrapper'>
			<div className='auth-inner'>
				<form onSubmit={handleSignup}>
					<h3>Sign Up</h3>
					<div className='mb-3'>
						<label>Email address</label>
						<input
							type='email'
							className='form-control'
							placeholder='Enter email'
							onChange={(e) => {
								setRegisterEmail(e.target.value);
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
							onChange={(e) => {
								setRegisterPassword(e.target.value);
							}}
							required
						/>
					</div>
					<select
						className='form-select'
						name='role'
						id=''
						required
						onChange={(e) => setRegisterRole(e.target.value)}>
						<option value=''>Select Role</option>
						<option value='owner'>Owner</option>
						<option value='customer'>Customer</option>
					</select>
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
							Sign Up
						</button>
					</div>
					<p className='forgot-password text-right'>
						Already registered <Link to='/signin'>sign in?</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
