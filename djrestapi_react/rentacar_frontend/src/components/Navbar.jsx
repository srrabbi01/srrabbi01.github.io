import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import { Logout } from '../auth/logout';

const Navbar = ({ user }) => {
	return (
		<>
			<nav className='navbar navbar-expand-sm navbar-dark bg-dark py-2 fixed-top px-5'>
				<div className='container-fluid '>
					<Link to={'/'} className='navbar-brand font-weight-bolder'>
						RentACar
					</Link>
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
							{user ? (
								user.role === 'owner' ? (
									<li className='nav-item'>
										<NavLink className='nav-link' to='/addcar'>
											Add Car
										</NavLink>
									</li>
								) : (
									<></>
								)
							) : (
								''
							)}

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
