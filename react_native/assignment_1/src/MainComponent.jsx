import React, { useEffect, useState } from 'react';
import CustomSidebarMenu from './navigation/CustomSidebarMenu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';

const Drawer = createDrawerNavigator();

export const MainComponent = () => {
	return (
		<Drawer.Navigator
			initialRouteName='home'
			screenOptions={{
				activeTintColor: '#e91e63',
				itemStyle: { marginVertical: 5 },
			}}
			drawerContent={(props) => <CustomSidebarMenu {...props} />}>
			<Drawer.Screen
				name='home'
				component={HomeScreen}
				options={{
					drawerLabel: 'Home',
					title: 'Home',
					drawerIcon: (focused) => (
						<FontAwesome5 name='home' size={16} color='blue' />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};
