import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import jquery from 'jquery';
import { useSelector } from 'react-redux';
import { Logout } from '../auth/logout';

// for changing navbar  color
jquery(window).scroll(function () {
	jquery('nav').toggleClass('scrolled', jquery(this).scrollTop() > 0);
});

const Navbar = () => {
	return (
		<>
			<nav className='navbar navbar-expand-sm navbar-dark bg-dark py-2 fixed-top px-5'>
				<div className='container-fluid '>
					<span className='navbar-brand font-weight-bolder'>Life Luxury</span>
					<a
						href='void(0)'
						className='navbar-toggler border-0'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span>
							<FaAlignRight className='nav-icon' />
						</span>
					</a>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav ms-auto'>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/'>
									Home
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/rooms'>
									Rooms
								</NavLink>
							</li>
							<li className='nav-item'>
								<Logout />
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
export default Navbar;
