import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { styles } from '../components/styles';

const ProfileScreen = () => {
	return (
		<View
			style={[
				styles.container,
				{ alignItems: 'center', justifyContent: 'center' },
			]}>
			<Text>Profile</Text>
		</View>
	);
};

export default ProfileScreen;
