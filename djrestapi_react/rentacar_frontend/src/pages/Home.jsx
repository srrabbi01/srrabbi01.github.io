import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CarsList from '../components/car/CarList';
import EmptyList from '../components/EmptyList';

const Home = () => {
	const [searchedText, setSearchedText] = useState('');
	const [cars, setCars] = useState([]);

	// useEffect(() => {
	// 	axios
	// 		.get('http://127.0.0.1:8000/api/car', {
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
	// 		.get(`http://127.0.0.1:8000/api/car?search=${searchedText}`, {
	// 			'content-type': 'multipart/form-data',
	// 		})
	// 		.then((response) => {
	// 			setCars(response.data);
	// 		});
	// 	console.log(searchedText)
	// };

	useEffect(() => {
		axios
			.get(`http://127.0.0.1:8000/api/car?search=${searchedText}`, {
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
				<button className='btn btn-outline-success' type='submit'>
					Search
				</button>
			</form>
			<section className='featured-rooms container h-100'>
				<h2 className='mb-3'>Featured Cars</h2>
				{cars.length > 0 ? (
					<CarsList cars={cars} />
				) : (
					<h1 className='mt-5'>Nothing found !!!</h1>
				)}
			</section>
		</>
	);
};

export default Home;
