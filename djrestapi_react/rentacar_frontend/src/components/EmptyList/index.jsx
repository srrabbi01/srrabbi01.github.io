import React from 'react';
import './styles.css';

const EmptyList = () => (
	<div className='emptyList-wrap'>
		<img src='/assets/images/undraw_no_data.svg' alt='empty' />
		<h4 className='mt-4'>No data found !!!</h4>
	</div>
);

export default EmptyList;
