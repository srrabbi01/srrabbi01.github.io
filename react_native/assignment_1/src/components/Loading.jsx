import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native-web';

export const TransLoading = () => {
	return (
		<LottieView
			source={require('../../assets/animations.json')}
			autoPlay
			loop
			style={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				zIndex: 9999,
				backgroundColor: '#FFF',
			}}
		/>
	);
};
