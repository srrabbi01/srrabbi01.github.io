import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainComponents from './MainComponents';
import Login from './auth/login.component';
import SignUp from './auth/signup.component';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<MainComponents />} />
					<Route path='/signin' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					{/* <Route path='*' element={<Error />} /> */}
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
}

export default App;
