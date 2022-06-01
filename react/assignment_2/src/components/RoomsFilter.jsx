import React from 'react';
import RoomsData from '../data';

const getUnique = (items, value) => {
	return [...new Set(items.map((item) => item.fields[value]))];
};

const RoomsFilter = ({ type, capacity, price, breakfast, handleChange }) => {
	let types = getUnique(RoomsData, 'type');
	types = ['all', ...types];
	types = types.map((item, index) => {
		return (
			<option value={item} key={index}>
				{item}
			</option>
		);
	});

	let people = getUnique(RoomsData, 'capacity');
	people = people.map((item, index) => {
		return (
			<option key={index} value={item}>
				{item}
			</option>
		);
	});

	return (
		<div className='container mt-5'>
			<h2>Search Rooms</h2>
			<div className='row'>
				<div className='col-md-6 col-12'>
					<div className='form-group'>
						<label htmlFor='type'>Room Type</label>
						<select
							name='type'
							id='type'
							value={type}
							className='form-select'
							onChange={handleChange}>
							{types}
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='capacity'>Guests</label>
						<select
							name='capacity'
							id='capacity'
							value={capacity}
							className='form-select'
							onChange={handleChange}>
							{people}
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='price'>Room Price Tk. {price}</label>
						<input
							type='range'
							name='price'
							min='0'
							max='700'
							id='price'
							value={price}
							onChange={handleChange}
							className='form-range'
						/>
					</div>
				</div>
				<div className='col-md-4 col-12 ml-auto'>
					<div className='form-check my-2'>
						<input
							type='checkbox'
							className='form-check-input'
							name='breakfast'
							id='breakfast'
							checked={breakfast}
							onChange={handleChange}
						/>
						<label htmlFor='breakfast' className='form-check-label'>
							Breakfast
						</label>
					</div>
					{/* <div className='input-group my-5'>
						<label htmlFor='size' className='mr-3'>
							Room Size{' '}
						</label>
						<input
							type='number'
							name='minSize'
							id='size'
							value={minSize}
							onChange={handleChange}
							className='form-control'
						/>
						<input
							type='number'
							name='maxSize'
							id='size'
							value={maxSize}
							onChange={handleChange}
							className='form-control'
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default RoomsFilter;
