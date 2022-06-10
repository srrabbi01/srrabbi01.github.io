import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CarsList from '../components/car/CarList';
import EmptyList from '../components/EmptyList';

const Home = () => {
	const [searchedText, setSearchedText] = useState('');
	const [cars, setCars] = useState([]);

	// useEffect(() => {
	// 	axios
	// 		.get('https://demo.rabbi.my.id/api/car', {
	// 			'Content-Type': 'application/json',
	// 		})
	// 		.then((response) => {
	// 			setCars(response.data);
	// 			setSearchedText('');
	// 		});
	// }, []);

	// const filterCars = (e) => {
	// 	setSearchedText(e.target.value);
	// 	axios
	// 		.get(`https://demo.rabbi.my.id/api/car?search=${searchedText}`, {
	// 			'content-type': 'multipart/form-data',
	// 		})
	// 		.then((response) => {
	// 			setCars(response.data);
	// 		});
	// 	console.log(searchedText)
	// };

	useEffect(() => {
		axios
			.get(`https://demo.rabbi.my.id/api/car?search=${searchedText}`, {
				'Content-Type': 'application/json',
			})
			.then((response) => {
				setCars(response.data);
			});
	}, [searchedText]);
	return (
		<>
			<form
				className='d-flex align-items-center mt-5 mb-3 mx-auto'
				style={{ maxWidth: '500px' }}>
				<input
					className='form-control me-2'
					type='search'
					placeholder='Search by name or brand ...'
					onChange={(e) => setSearchedText(e.target.value)}
					value={searchedText}
				/>
				<button className='btn btn-outline-success' type='button'>
					Search
				</button>
			</form>
			<section className='featured-rooms container h-100'>
				<h2 className='mb-3 text-center'>Featured Cars</h2>
				{cars.length > 0 ? <CarsList cars={cars} /> : <EmptyList />}
			</section>
		</>
	);
};

export default Home;
