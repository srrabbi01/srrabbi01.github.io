import React from 'react';
import EmptyList from '../../components/common/EmptyList';
import PhotoList from '../../components/Home/PhotoList';

const Home = ({ photos }) => {
	return (
		<>
			{/* Blog List & Empty View */}
			{!photos.length ? <EmptyList /> : <PhotoList photos={photos} />}
		</>
	);
};

export default Home;
