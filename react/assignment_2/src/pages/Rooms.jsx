import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import RoomsData from '../data';
import Room from '../components/Room';
import RoomsFilter from '../components/RoomsFilter';

const getRoomsAsReactChild = (roomdata) => {
	return roomdata.map((room, index) => {
		return <Room key={index} room={room} />;
	});
};

const Rooms = () => {
	const [type, setType] = useState('');
	const [capacity, setCapacity] = useState('');
	const [breakfast, setBreakfast] = useState('');
	const [price, setPrice] = useState(0);
	const [rooms, setRooms] = useState([]);
	let tempRooms = [...RoomsData.map((item) => item.fields)];
	let maxPrice = Math.max(...tempRooms.map((item) => item.price));

	useEffect(() => {
		setRooms(getRoomsAsReactChild(tempRooms));
		setPrice(maxPrice);
	}, []);

	const getfilteredRooms = () => {
		let filteredRooms = [...tempRooms];
		if (type !== 'all' && type !== '') {
			filteredRooms = filteredRooms.filter((room) => room.type === type);
		}
		if (capacity > 1) {
			filteredRooms = filteredRooms.filter((room) => room.capacity >= capacity);
		}
		filteredRooms = filteredRooms.filter((room) => room.price <= price);
		if (breakfast)
			filteredRooms = filteredRooms.filter((room) => room.breakfast === true);

		setRooms(getRoomsAsReactChild(filteredRooms));
	};

	useEffect(() => {
		getfilteredRooms();
	}, [type, capacity, price, breakfast]);

	const handleChange = (e) => {
		let name = e.target.name;
		let value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		if (name === 'type') setType(value);
		if (name === 'capacity') setCapacity(value);
		if (name === 'price') setPrice(value);
		if (name === 'breakfast') setBreakfast(value);
	};

	return (
		<>
			<div className='roomsHero'></div>
			<Banner title='Available Rooms' subtitle='Best in Class Room'>
				<Link to='/' className='btn btn-warning'>
					RETURN HOME
				</Link>
			</Banner>
			<RoomsFilter {...{ type, capacity, price, breakfast, handleChange }} />
			<section className='container'>
				<div className='row my-5'>{rooms}</div>
			</section>
		</>
	);
};

export default Rooms;
