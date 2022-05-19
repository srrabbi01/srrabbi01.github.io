import React, { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Home/Header';
import { photoList } from './config/data';
import Photo from './pages/Photo';
import Home from './pages/Home';
const MainComponent = () => {
	const [photos, setPhotos] = useState(photoList);
	const [searchKey, setSearchKey] = useState('');
	const navigate = useNavigate();

	// Search submit
	const handleSearchBar = (e) => {
		e.preventDefault();
		handleSearchResults();
	};

	// Search for blog by category
	const handleSearchResults = () => {
		const allPhotos = photoList;
		const filteredPhotos = allPhotos.filter((photo) =>
			photo.category.toLowerCase().includes(searchKey.toLowerCase().trim()),
		);
		setPhotos(filteredPhotos);
		navigate('/');
	};

	// Clear search and show all photos
	const handleClearSearch = () => {
		setPhotos(photoList);
		setSearchKey('');
	};

	return (
		<div className='container'>
			{/* Page Header */}
			<Header
				value={searchKey}
				clearSearch={handleClearSearch}
				formSubmit={handleSearchBar}
				handleSearchKey={(e) => setSearchKey(e.target.value)}
			/>
			{/* Blog List & Empty View */}
			<Routes>
				<Route exact path='/' element={<Home photos={photos} />} />
				<Route exact path='/photo/:id' element={<Photo />} />
				<Route path='*' element={<Navigate replace to='/pagenotfound' />} />
			</Routes>
		</div>
	);
};

export default MainComponent;
