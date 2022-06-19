import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
	const { user } = useContext(AuthContext);
    
	return (
		<View>
			<Text>{user.displayName}</Text>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({});
