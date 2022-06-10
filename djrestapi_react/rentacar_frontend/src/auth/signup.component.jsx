import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [registerRole, setRegisterRole] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const authData = {
		email: registerEmail,
		password: registerPassword,
		role: registerRole,
	};

	const header = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const handleSignup = async (e) => {
		e.preventDefault();
		let carurl = 'https://demo.rabbi.my.id/api/user/';
		axios
			.post(carurl, authData, header)
			.then((response) => {
				toast.success('Account created in successfully');
				axios
					.post('https://demo.rabbi.my.id/api/token', authData, header)
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
