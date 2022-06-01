import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import BookRoom from './pages/BookRoom';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import { PrivateRoute } from './Routes/privateRoutes';

const MainComponents = () => {
	return (
		<div className='main'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/rooms' element={<Rooms />} />
				<Route path='/rooms/:slug' element={<RoomDetails />} />

				<Route
					path='/bookroom/:slug'
					element={
						<PrivateRoute>
							<BookRoom />
						</PrivateRoute>
					}
				/>
				<Route path='*' element={<Error />} />
			</Routes>
		</div>
	);
};

export default MainComponents;
