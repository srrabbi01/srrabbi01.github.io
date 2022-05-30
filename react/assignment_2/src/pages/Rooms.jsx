import React from 'react';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
// import RoomsContainer from '../components/RoomsContainer';

const Rooms = () => {
	return (
		<div>
			<div className='roomsHero'>Hero</div>
			<Banner title='Available Rooms' subtitle='Best in Class Room'>
				<Link to='/' className='btn btn-warning'>
					RETURN HOME
				</Link>
			</Banner>
			{/* <RoomsContainer /> */}
		</div>
	);
};

export default Rooms;
