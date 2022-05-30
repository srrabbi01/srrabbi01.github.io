import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import data from '../data';
import Room from '../components/Room';

const Home = () => {
	const featuredRooms = data
		.filter((room) => {
			return room.fields.featured === true;
		})
		.map((room) => {
			return <Room room={room.fields} />;
		});

	return (
		<>
			<div className='defaultHero'>Hero</div>

			<Banner title='Luxurious Rooms' subtitle='deluxe rooms starting at 300$'>
				<Link to='/rooms' className='btn btn-primary'>
					Our Rooms
				</Link>
			</Banner>
			{/* <Services /> */}
			<section className='featured-rooms container'>
				<h2>Featured Rooms</h2>
				<div className='row'>
					{featuredRooms}
					{/* {loading ? <Loading/> : rooms} */}
				</div>
			</section>
		</>
	);
};

export default Home;
