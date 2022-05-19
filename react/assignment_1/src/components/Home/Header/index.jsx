import React from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../../../auth/logout';
import './styles.css';

const Header = ({ formSubmit, value, handleSearchKey, clearSearch }) => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand fw-bold' to='/'>
					Photog
				</Link>
				<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
					{/* <li className='nav-item'>
						<Link className='nav-link active' to='#'>
							Home
						</Link>
					</li> */}
				</ul>
				<div className='searchBar-wrap'>
					<form className='d-flex' onSubmit={formSubmit}>
						<input
							className='form-control form-sm me-2'
							type='text'
							placeholder='Search By Category'
							value={value}
							onChange={handleSearchKey}
						/>
						{value && <span onClick={clearSearch}>X</span>}
						<button className='btn btn-outline-success btn-sm' type='submit'>
							Search
						</button>
					</form>
				</div>
				<Logout />
			</div>
		</nav>
	);
};

export default Header;
