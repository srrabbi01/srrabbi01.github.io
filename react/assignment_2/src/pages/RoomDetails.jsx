import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { Link, useParams } from 'react-router-dom';
import RoomsData from '../data';
import StyledHero from '../components/StyledHero';
import { useSelector } from 'react-redux';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const RoomDetails = () => {
	const { slug } = useParams();
	const room = RoomsData.find((item) => {
		return item.fields.slug === slug;
	});
	const user = useSelector((state) => state.user);
	// const [avlRoom, setAvlRoom] = useState({});
	const [available, setAvailable] = useState(0);
	const [quantity, setQuantity] = useState(0);

	const getAvailabaleRoom = async () => {
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
			getAvailabaleRoom();
		}
		setAvailable(avlRoom.available);
		setQuantity(avlRoom.quantity);
	};

	useEffect(() => {
		getAvailabaleRoom();
	}, []);

	if (!room) {
		return (
			<div className='roomsHero roomerror'>
				<div className='row my-5'>
					<div className='col-12 mx-auto'>
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
		<>
			<StyledHero img={mainImg.url || defaultBcg}>
				<Banner title={`${name} room`}>
					<Link to='/rooms' className='btn btn-primary'>
						Back To Rooms
					</Link>
				</Banner>
			</StyledHero>
			<section className='single-room container'>
				<div className='row'>
					{defaultBcg.map((item, index) => {
						return (
							<div className='col-md-4 col-12 mx-auto' key={index}>
								<div className='card border-0 shadow-lg'>
									<img
										key={index}
										src={item.url}
										alt={name}
										className='img-fluid'
									/>
								</div>
							</div>
						);
					})}
				</div>
				<h5
					className='alert alert-warning mt-3'
					style={{ maxWidth: 'max-content' }}>
					Available Room Left: {available}/{quantity}
				</h5>
				<div className='single-room-info'>
					<article className='desc'>
						<h3>Details</h3>
						<p>{description}</p>
					</article>
					<article className='info'>
						<h3>Info</h3>
						<h6>price : Rs{price}</h6>
						<h6>size : {size} SQFT</h6>
						<h6>
							max capacity :{' '}
							{capacity > 1 ? `${capacity} people` : `${capacity} person`}
						</h6>
						<h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
						<h6>{breakfast && 'free breakfast included'}</h6>
					</article>
				</div>
			</section>
			<section className='room-extras container'>
				<h3>Extras</h3>
				<ul className='extras'>
					{extras.map((item, index) => {
						return <li key={index}>{item}</li>;
					})}
				</ul>
				<div className='py-4 px-2 clearfix pb-5'>
					<div className='row'>
						{available === 0 ? (
							<div className='col-12 ms-auto alert alert-danger'>
								<h5>
									Currently no room available at this moment. Please see others
									room or try again later.
								</h5>
							</div>
						) : (
							<div className='col-md-3 col-12 ms-auto'>
								{user ? (
									<Link
										to={`/bookroom/${slug}`}
										className='btn btn-dark btn-block float-end '>
										Book Now
									</Link>
								) : (
									<div className='alert alert-warning'>
										Please login for booking <Link to={`/signin`}>Login</Link>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default RoomDetails;
