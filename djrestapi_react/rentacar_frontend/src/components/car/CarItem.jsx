import React from 'react';
import { Link } from 'react-router-dom';

function CarItem({ car }) {
	return (
		<Link
			to={`/car/${car.id}`}
			className='col-12 col-md-6 col-lg-3 mb-4'
			style={{ position: 'relative' }}>
			<img
				className='carImage'
				style={{
					width: '100%',
					aspectRatio: '4/3',
					objectFit: 'cover',
					maxWidth: '100%',
					borderRadius: 8,
					margin: '0px',
					boxShadow: '0px 0px 20px -3px rgba(255,255,255,0.84)',
				}}
				alt=''
				src={
					car.images
						? car.images
						: 'https://previews.123rf.com/images/hayesnch/hayesnch1708/hayesnch170800025/84814823-empty-open-trunk-of-a-car.jpg'
				}></img>
			<div
				style={{
					background: 'white',
					color: '#333',
					position: 'absolute',
					right: 'calc(1.5em + 15px)',
					bottom: '1em',
					borderRadius: 5,
					boxShadow: '0px 0px 18px 1px rgba(0,0,0,0.98)',
				}}>
				<h3 className='mb-0' style={{ padding: '7px', fontSize: 15 }}>
					{car.name} | {car.brand} |{' '}
					<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
						${car.daily_price ? car.daily_price : 0}
					</span>
				</h3>
			</div>

			<div
				style={{
					position: 'absolute',
					left: '1em',
					bottom: '1em',
				}}></div>
		</Link>
	);
}

export default CarItem;
