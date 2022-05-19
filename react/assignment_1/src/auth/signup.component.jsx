import React, { useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { loginUser } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [error, setError] = useState('');
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword,
			);
			if (user) {
				setError('');
				return navigate('/');
			}
		} catch (error) {
			if (error.code === 'auth/invalid-email') {
				setError('Invalid Email Entered !!!');
			} else if (error.code === 'auth/weak-password') {
				setError('Password should be at least 6 characters !!!');
			} else if (error.code === 'auth/email-already-in-use') {
				setError('Account already exist !!!');
			} else if (error.code === 'auth/internal-error') {
				setError('Username or Password Empty !!!');
			} else console.log(error);
		}
	};

	onAuthStateChanged(auth, (currentUser) => {
		dispatch(loginUser(currentUser));
	});

	return (
		<div className='auth-wrapper'>
			<div className='auth-inner'>
				<form>
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
						<button
							type='button'
							className='btn btn-primary'
							onClick={register}>
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
