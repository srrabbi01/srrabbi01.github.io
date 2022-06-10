import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAuthUser } from '../auth/Auth';

function CarDetailsPage() {
	// async function fileUpload(file) {
	// 	const url = `https://springrestapi-carrental.herokuapp.com/api/images/add?id=${currentCar.id}`;
	// 	const formData = new FormData();
	// 	formData.append('imageFile', file);
	// 	const config = {
	// 		headers: {
	// 			'content-type': 'multipart/form-data',
	// 		},
	// 	};
	// 	const response = await axios.post(url, formData, config);
	// 	return response;
	// }
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		getAuthUser(setUser);
	}, []);

	const { id } = useParams();
	const [car, setCar] = useState(null);

	useEffect(() => {
		axios
			.get(`https://demo.rabbi.my.id/api/car/${id}`, {
				'content-type': 'multipart/form-data',
			})
			.then((response) => setCar(response.data));
	}, []);

	return (
		<div
			style={{
				marginLeft: 'auto',
				marginRight: 'auto',
				height: '100%',
				display: 'grid',
				placeItems: 'center',
			}}>
			{car ? (
				<div
					style={{
						width: '100%',
						maxWidth: '800px',
						background: '#4E4E50',
						borderRadius: 10,
						padding: 10,
						textAlign: 'left',
					}}>
					<div style={{ padding: 10, color: 'white' }}>
						<img
							className='mb-2'
							style={{
								width: '100%',
								height: '100%',
								maxHeight: '400px',
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
							className='py-2'
							style={{
								background: '#696969',
								borderRadius: 10,
								marginBottom: 10,
							}}>
							<h5 className='px-4 py-2'>Daily Price: ${car.daily_price}/day</h5>
							<h5 className='px-4 py-2'>Brand: {car.brand}</h5>
							<h5 className='px-4 py-2'>Description: {car.description}</h5>
						</div>

						{user ? (
							user.role === 'customer' ? (
								<Link to={'/rentcar/' + id}>
									<button className='btn btn-primary'>Rent this car</button>
								</Link>
							) : (
								<div>
									<button disabled className='btn btn-primary'>
										Rent this car
									</button>
									<p className='alert alert-warning py-2 mt-2'>
										Need customer account to have a renting opportunity
									</p>
								</div>
							)
						) : (
							<div>
								<button disabled className='btn btn-primary'>
									Rent this car
								</button>
								<p className='alert alert-warning py-2 mt-2'>
									Please log in for renting a car!{' '}
									<Link to={'/signin'}> Signin</Link>
								</p>
							</div>
						)}
					</div>
				</div>
			) : (
				<h4>No data found !!!</h4>
			)}
		</div>
	);
}

export default CarDetailsPage;
