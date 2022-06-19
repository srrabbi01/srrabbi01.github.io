import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { Alert, Button } from 'react-native';

export const Logout = ({ navigation }) => {
	const handleLogout = () => {
		Alert.alert('Sign Out?', 'Are you sure you want to sign out?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => {
					signOut(auth);
					navigation.replace('login');
				},
			},
		]);
	};

	return <Button title='SignOut' onPress={handleLogout}></Button>;
};
