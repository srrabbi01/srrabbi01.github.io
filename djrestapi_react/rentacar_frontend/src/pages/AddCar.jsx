import React, { useEffect, useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAuthUser } from '../auth/Auth';
import { useNavigate } from 'react-router-dom';

const AddCarPage = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		getAuthUser(setUser);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.append('owner', user.id);

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		axios
			.post('https://demo.rabbi.my.id/api/car/', formData, config)
			.then((response) => {
				toast.success('Car added successfully');
				navigate('/');
			})
			.catch((err) => {
				setTimeout(() => {
					toast.success('An error occured. Try again later');
					navigate('/');
				}, 1000);
			});
	};

	return (
		<div
			style={{
				marginLeft: 'auto',
				marginRight: 'auto',
				textAlign: 'left',
				height: '100%',
				display: 'grid',
				placeItems: 'center',
			}}>
			<div className='addCarPage p-4'>
				<h3>Add New Car</h3>
				<form
					action=''
					method='post'
					encType='multipart/form-data'
					onSubmit={handleSubmit}>
					<input
						type='text'
						name='name'
						id=''
						className='form-control mb-3'
						placeholder='Car Name'
					/>
					<select className='form-select mb-3' name='brand' id=''>
						<option value=''>Select Brand</option>
						<option value='Toyota'>Toyota</option>
						<option value='Ford'>Ford</option>
						<option value='Honda'>Honda</option>
						<option value='Hyundai'>Hyundai</option>
						<option value='Chevrolet'>Chevrolet</option>
						<option value='Others'>Others</option>
					</select>
					<input
						type='number'
						name='daily_price'
						id=''
						className='form-control mb-3'
						placeholder='Daily Price'
					/>
					<textarea
						name='description'
						id=''
						cols='30'
						rows='5'
						className='form-control'
						placeholder='Description'></textarea>
					<div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginTop: 50,
							}}>
							<div>
								<input
									name='images'
									className='form-control'
									id='file-upload'
									type='file'
								/>
							</div>

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
	);
};

export default AddCarPage;
