import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { photoList } from '../../config/data';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const Photo = () => {
	const { id } = useParams();
	const [photo, setPhoto] = useState(null);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const [feedbacks, setFeedbacks] = useState([]);
	const feedbacksCollectionRef = collection(db, 'feedbacks');
	const user = useSelector((state) => state.user);

	const getFeedbacks = async () => {
		const data = await getDocs(feedbacksCollectionRef);
		const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

		setFeedbacks(
			getData.filter((item) => {
				return item.photoId === parseInt(id);
			}),
		);
	};

	useEffect(() => {
		let photo = photoList.find((blog) => blog.id === parseInt(id));
		if (photo) setPhoto(photo);
		getFeedbacks();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		addDoc(feedbacksCollectionRef, {
			photoId: parseInt(id),
			username: username,
			comment: comment,
		});
		getFeedbacks();
		setUsername('');
		setEmail('');
		setComment('');
	};

	return (
		<>
			<Link className='blog-goBack mt-3' to='/'>
				<span> &#8592;</span> <span>Go Back</span>
			</Link>
			{photo ? (
				<div className='blogHChip-wrap'>
					<header>
						<h1>{photo.title}</h1>
						<div className='blog-subCategory'>
							{photo.subCategory.map((category, i) => (
								<div key={i}>
									<p className='chip'>{category}</p>
								</div>
							))}
						</div>
					</header>
					<img src={photo.cover} alt='cover' />
					<h4 className='text-primary mt-5 '>Comments - {feedbacks.length}</h4>
					{feedbacks.map((item) => {
						return (
							<div key={item.id} className='mb-4'>
								<h6 className='text-capitalize'>{item.username}</h6>
								<p>
									<small>{item.comment}</small>
								</p>
							</div>
						);
					})}
					<hr />
					<br />
					<br />
					<h5>Leave a Comment</h5>
					{user ? (
						<form action='' onSubmit={(e) => handleSubmit(e)}>
							<label htmlFor=''>Username</label>
							<input
								className='form-control mb-2'
								type='text'
								name='username'
								id='username'
								placeholder='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>{' '}
							<label htmlFor=''>Email</label>
							<input
								className='form-control mb-2'
								type='email'
								name='email'
								id='username'
								placeholder='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>{' '}
							<label htmlFor=''>Comment</label>
							<textarea
								className='form-control'
								name=''
								id=''
								cols='30'
								rows='5'
								placeholder='comment'
								value={comment}
								onChange={(e) => setComment(e.target.value)}></textarea>
							<button className='btn btn-primary mt-4' type='submit'>
								submit
							</button>
						</form>
					) : (
						<p className='alert alert-warning'>
							You must signin for comment.{' '}
							<Link to={'/signin?next='}>Click here</Link> for signin.
						</p>
					)}
					<br />
					<br />
				</div>
			) : (
				<EmptyList />
			)}
		</>
	);
};

export default Photo;
