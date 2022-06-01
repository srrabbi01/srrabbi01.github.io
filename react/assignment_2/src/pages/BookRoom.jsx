import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RoomsData from '../data';
import moment from 'moment';
import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useSelector } from 'react-redux';
import Modal from 'bootstrap/js/dist/modal';
const BookRoom = () => {
	const { slug } = useParams();
	const room = RoomsData.find((item) => {
		return item.fields.slug === slug;
	});

	const today = moment(new Date()).format('YYYY-MM-DD');
	const [fromDate, setFromDate] = useState(today);
	const [toDate, setToDate] = useState(today);
	const [daysLeft, setDaysLeft] = useState(0);
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [payment, setPayment] = useState('');
	const user = useSelector((state) => state.user);

	const getDiffDate = (e) => {
		let from = moment(fromDate);
		let to = moment(toDate);
		let diffDate = moment.duration(to.diff(from)).asDays();
		if (diffDate >= 0) setDaysLeft(diffDate);
	};

	const updateAvailabaleRoom = async () => {
		const data = await getDocs(collection(db, 'roomavailability'));
		const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		const avlRoom = getData.find((item) => {
			return item.roomId === parseInt(room.fields.id);
		});

		if (!avlRoom) {
			addDoc(collection(db, 'roomavailability'), {
				roomId: parseInt(room.fields.id),
				quantity: 5,
				available: 5,
			});
			updateAvailabaleRoom();
		}

		const avlRoomDoc = doc(db, 'roomavailability', avlRoom.id);
		await updateDoc(avlRoomDoc, {
			...avlRoom,
			available: avlRoom.available - 1,
		});
	};

	useEffect(() => {
		getDiffDate();
	}, [fromDate, toDate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		addDoc(collection(db, 'bookroom'), {
			roomId: parseInt(room.fields.id),
			userId: user.uid,
			email: email,
			phone: phone,
			fromDate: fromDate,
			toDate: toDate,
			payment: payment,
		});
		updateAvailabaleRoom();
		setEmail('');
		setPhone('');
		setPayment('');
		setDaysLeft(0);
		setFromDate(today);
		setToDate(today);
		var myModal = new Modal(document.getElementById('thanks'));
		myModal.show();
	};

	if (!room) {
		return (
			<div className='container roomerror'>
				<div className='row my-5'>
					<div className='col-md-6 col-12 mx-auto'>
						<div className='card shadow-lg border-0 p-4 error'>
							<h1 className='text-center display-4'>SORRY</h1>
							<h3>No such room could be found...</h3>
							<Link to='/rooms' className='btn btn-warning mt-4 '>
								Back to Rooms
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
	const {
		name,
		description,
		capacity,
		size,
		price,
		extras,
		breakfast,
		pets,
		images,
	} = room.fields;
	const [mainImg, ...defaultBcg] = images;

	return (
		<div className='defaultHero'>
			<div className='container my-5'>
				<div className='row'>
					<form
						className='col-md-10 mx-auto col-12 card shadow-lg border-0 p-4'
						onSubmit={handleSubmit}>
						<div>
							<h1 className='display-4'>Booking</h1>
						</div>
						<div className='row'>
							<div className='col-md-6 col-12 my-auto'>
								<img
									src={mainImg.url || defaultBcg.url}
									className='img-fluid'
									alt='selected room'
								/>
							</div>
							<div className='col-md-6 col-12 my-auto'>
								<h1>Rooms Details</h1>
								<table className='table'>
									<thead className='thead-light'>
										<tr>
											<th>Room Type</th>
											<td>{name}</td>
										</tr>
										<tr>
											<th>Capacity</th>
											<td>{capacity}</td>
										</tr>
										<tr>
											<th>Size</th>
											<td>{size} sqft.</td>
										</tr>
										<tr>
											<th>Breakfast</th>
											<td>
												{breakfast === true ? `Included` : `Not Included`}
											</td>
										</tr>
										<tr>
											<th>Pets</th>
											<td>{pets === true ? `Allowed` : `Not Allowed`}</td>
										</tr>
									</thead>
								</table>
							</div>
						</div>
						<div className='row my-3'>
							<div className='col-md-6 col-12'>
								<div className='form-group'>
									<label htmlFor='Fromdate' className='font-weight-bolder mr-3'>
										Email
									</label>
									<input
										required
										type='email'
										name=''
										id=''
										className='form-control'
										placeholder='Enter your email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='Fromdate' className='font-weight-bolder mr-3'>
										Phone
									</label>
									<input
										required
										type='tel'
										name=''
										id=''
										className='form-control'
										placeholder='Enter your Phone'
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-6 col-12'>
								<div className='form-group'>
									<label htmlFor='Fromdate' className='font-weight-bolder mr-3'>
										From Date{' '}
									</label>
									<input
										type='date'
										name=''
										id=''
										className='form-control'
										value={fromDate}
										onChange={(e) => setFromDate(e.target.value)}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='Todate' className='font-weight-bolder mr-3'>
										To Date{' '}
									</label>
									<input
										type='date'
										name=''
										id=''
										className='form-control'
										value={toDate}
										onChange={(e) => setToDate(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 col-12'>
								<h6 className='font-weight-bolder'>
									Number of days : {daysLeft}
								</h6>
								<mark>Please make sure Checkin time is from 9 am to 12 pm</mark>
							</div>
							<div className='col-md-6 col-12'>
								<h6 className='font-weight-bold'>
									Price per day :{' '}
									<span className='badge bg-info'>Rs {price}</span>
								</h6>
								<h6 className='font-weight-bold'>
									Total Price to be paid :{' '}
									<span className='text-primary'>Rs {daysLeft * price}</span>
								</h6>
							</div>
						</div>
						<div className='row my-4'>
							<div className='col-md-6 col-12'>
								<div className='form-group'>
									<label htmlFor='payment' className='font-weight-bolder'>
										Payment Options
									</label>
									<select
										className='form-control'
										required
										name='payment'
										value={payment}
										onChange={(e) => setPayment(e.target.value)}>
										<option value=''>Select payment option</option>
										<option value='Credit'>Credit Card</option>
										<option value='Debit'>Debit Card</option>
										<option value='checkin'>Pay during Checkin</option>
									</select>
								</div>
							</div>
							<div className='col-md-6 col-12 my-auto'>
								<div className='col-md-6 col-12 float-right'>
									<button
										className='btn btn-block btn-outline-primary'
										type='submit'>
										Confirm Booking
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className='modal fade' id='thanks'>
					<div className='modal-dialog modal-dialog-centered'>
						<div className='modal-content'>
							<div className='modal-body p-4'>
								<h3>Thank you </h3>
								<p className='lead'>Your room is booked successfully....</p>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-secondary'
									data-bs-dismiss='modal'>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookRoom;
