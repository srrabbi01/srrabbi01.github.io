import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { styles } from '../components/styles';

const SettingsScreen = () => {
	return (
		<View
			style={[
				styles.container,
				{ alignItems: 'center', justifyContent: 'center' },
			]}>
			<Text>Settings</Text>
		</View>
	);
};

export default SettingsScreen;
