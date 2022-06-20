import React, { useEffect, useState } from 'react';
import CustomSidebarMenu from './navigation/CustomSidebarMenu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export const MainComponent = () => {
	return (
		<Drawer.Navigator
			initialRouteName='home'
			screenOptions={{
				activeTintColor: '#e91e63',
				itemStyle: { marginVertical: 5 },
				drawerPosition:'right'
			}}
			drawerContent={(props) => <CustomSidebarMenu {...props} />}>
			<Drawer.Screen
				name='home'
				component={HomeScreen}
				options={{
					drawerLabel: 'Home',
					title: 'Home',
					drawerIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='home-outline'
							size={20}
							color={color}
						/>
					),
					drawerActiveBackgroundColor: '#444',
					drawerActiveTintColor: '#fff',
					drawerItemStyle: {
						paddingHorizontal: 5,
					},
				}}
			/>
			<Drawer.Screen
				name='profile'
				component={ProfileScreen}
				options={{
					drawerLabel: 'Profile',
					title: 'User Profile',
					drawerIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='account-box-multiple-outline'
							size={20}
							color={color}
						/>
					),
					drawerActiveBackgroundColor: '#444',
					drawerActiveTintColor: '#fff',
					drawerItemStyle: {
						paddingHorizontal: 5,
					},
				}}
			/>
			<Drawer.Screen
				name='settings'
				component={SettingsScreen}
				options={{
					drawerLabel: 'Settings',
					title: 'All Settings',
					drawerIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='cog-outline'
							size={20}
							color={color}
						/>
					),
					drawerActiveBackgroundColor: '#444',
					drawerActiveTintColor: '#fff',
					drawerItemStyle: {
						paddingHorizontal: 5,
					},
				}}
			/>
		</Drawer.Navigator>
	);
};
