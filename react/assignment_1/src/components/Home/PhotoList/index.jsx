import React from 'react';
import PhotoItem from './PhotoItem';
import './styles.css';

const PhotoList = ({ photos }) => {
	return (
		<div className='blogList-wrap mt-5'>
			{photos.map((photo) => (
				<PhotoItem photo={photo} key={photo.id} />
			))}
		</div>
	);
};

export default PhotoList;
