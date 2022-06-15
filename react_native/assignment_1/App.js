import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { MainComponent } from './src/MainComponent';
import { store } from './src/redux/store';

export default function App() {
	return (
		<Provider store={store}>
			<MainComponent />
		</Provider>
	);
}
