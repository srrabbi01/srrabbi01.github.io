import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import CarItem from './CarItem';

const CarsList = ({ cars }) => {
	return (
		<div className='row'>
			{cars
				? cars.map((car) => {
						return <CarItem key={car.id} car={car} />;
				  })
				: ''}
		</div>
	);
};

export default CarsList;
