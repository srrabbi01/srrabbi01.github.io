import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const PhotoItem = ({ photo:{cover,id,category} }) => {
	return (
		<div className='blogItem-wrap'>
			<Link className='blogItem-link' to={`/photo/${id}`}>
				<img className='blogItem-cover' src={cover} alt='cover' />
			</Link>
			<p className='chip mb-0'>{category}</p>
		</div>
	);
};

export default PhotoItem;
