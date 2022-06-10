import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
const Login = () => {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

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
		let carurl = 'https://demo.rabbi.my.id/api/token';
		axios
			.post(carurl, authData, header)
			.then((response) => {
				if (response.status === 200) {
					const token = response.data.access;
					const authDecoded = jwtDecode(token);
					localStorage.setItem('access_token', token);
					localStorage.setItem('user_id', authDecoded.user_id);
					toast.success('Account logged in successfully');
					navigate('/');
				}
			})
			.catch((error) => {
				for (const [key, value] of Object.entries(error.response.data)) {
					toast.error(String(value));
				}
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
