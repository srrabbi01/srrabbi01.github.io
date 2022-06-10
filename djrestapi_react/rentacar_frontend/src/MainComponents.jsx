import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuthUser } from './auth/Auth';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import AddCarPage from './pages/AddCar';
import CarDetailsPage from './pages/CarDetails';
import Home from './pages/Home';
import RentCar from './pages/RentCar';
import { PrivateRoute } from './Routes/privateRoutes';

const MainComponents = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getAuthUser(setUser);
		setLoading(false);
	}, []);
	if (loading) return <Loading />;
	return (
		<div className='main pt-5'>
			<Navbar user={user} />
			<div className='container-fluid pt-2 h-100'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/car/:id' element={<CarDetailsPage />} />

					<Route
						path='/rentcar/:id'
						element={
							<PrivateRoute>
								<RentCar />
							</PrivateRoute>
						}
					/>
					<Route
						path='/addcar'
						element={
							<PrivateRoute>
								<AddCarPage />
							</PrivateRoute>
						}
					/>
					{/* <Route path='*' element={<Error />} /> */}
				</Routes>
			</div>
		</div>
	);
};

export default MainComponents;
