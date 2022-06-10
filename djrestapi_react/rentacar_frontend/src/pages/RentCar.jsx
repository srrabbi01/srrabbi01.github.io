import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAuthUser } from '../auth/Auth';
import moment from 'moment';

function RentCar() {
	const [rentDate, setRentDate] = useState('');
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.append('customer', user.id);
		formData.append('car', id);
		const currentDate = moment().startOf('day');
		const rentedDate = moment(rentDate);

		var diffDays = moment.duration(rentedDate.diff(currentDate)).asDays();
		if (diffDays > 0) {
			const config = {
				headers: {
					'content-type': 'application/json',
				},
			};
			axios
				.post('https://demo.rabbi.my.id/api/rentcar/', formData, config)
				.then((response) => {
					toast.success('Car Rented successfully');
					navigate('/');
				})
				.catch((err) => {
					setTimeout(() => {
						toast.success('An error occured. Try again later');
						navigate('/');
					}, 1000);
				});
		} else {
			toast.error(
				'Cannot Rent Car on same or previous day. Please Select another Date.',
			);
		}
	};

	return (
		<div
			style={{
				marginLeft: 'auto',
				marginRight: 'auto',
				height: '100%',
				display: 'grid',
				placeItems: 'center',
			}}>
			{user ? (
				user.role === 'customer' ? (
					car ? (
						<div
							className='row'
							style={{
								width: '100%',
								maxWidth: '1080px',
								background: '#4E4E50',
								borderRadius: 10,
								padding: 10,
								textAlign: 'left',
							}}>
							<div
								className='h-100 col-12 col-md-8'
								style={{ padding: 10, color: 'white' }}>
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
									<h5 className='px-4 py-2'>
										Daily Price: ${car.daily_price}/day
									</h5>
									<h5 className='px-4 py-2'>Brand: {car.brand}</h5>
									<h5 className='px-4 py-2'>Description: {car.description}</h5>
								</div>

								<Link to={'/rentcar/' + id}>
									<button className='btn btn-primary'>Go Back</button>
								</Link>
							</div>
							<div className='p-4 col-12 col-md-4'>
								<h3>Add New Car</h3>
								<form
									action=''
									method='post'
									encType='multipart/form-data'
									onSubmit={handleSubmit}>
									<input
										type='text'
										name='email'
										id=''
										className='form-control mb-3'
										placeholder='Your Email'
										required
									/>
									<input
										type='number'
										name='phone'
										id=''
										className='form-control mb-3'
										placeholder='Your Phone Number'
										required
									/>
									<input
										className='form-control'
										type='date'
										name='rent_date'
										id=''
										value={rentDate}
										onChange={(e) => {
											setRentDate(e.target.value);
										}}
										required
									/>
									<div>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												marginTop: 20,
											}}>
											<button
												type='submit'
												className='nextButton customizedButton py-2'>
												<Icon name='add'></Icon> Add Car
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					) : (
						<h4>No data found !!!</h4>
					)
				) : (
					<h4>Need customer account to have a renting opportunity </h4>
				)
			) : (
				''
			)}
		</div>
	);
}

export default RentCar;
