import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import RoomsData from '../data';
import Room from '../components/Room';
import { useSelector } from 'react-redux';

const Home = () => {
	const featuredRooms = RoomsData.filter((room) => {
		return room.fields.featured === true;
	}).map((room, index) => {
		return <Room key={index} room={room.fields} />;
	});
	const user = useSelector((state) => state.user);
	console.log(user);
	return (
		<>
			<div className='defaultHero'></div>

			<Banner
				title='Luxurious Rooms'
				subtitle='deluxe rooms starting at Tk.500'>
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
