import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import { styles } from '../components/styles';
import { BookList } from '../components/BookList';

import AuthContext from '../context/AuthContext';
import BookContext from '../context/BookContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

const HomeScreen = () => {
	const { getBooks } = useContext(BookContext);

	useEffect(() => {
		getBooks();
	}, []);

	return (
		<ScrollView>
			<View style={styles.container}>
				{/* <Balance /> */}
				{/* <IncomeExpenses /> */}
				{/* <AddBook /> */}
				<BookList />
			</View>
		</ScrollView>
	);
};

// export default HomeScreen = () => {
// 	return (
// 		<Tab.Navigator
// 			screenOptions={{
// 				headerShown: true,
// 				tabBarStyle: { position: 'absolute' },
// 			}}>
// 			<Tab.Screen name='index' component={Home} />
// 			<Tab.Screen name='add' component={Home} />
// 			{/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
// 		</Tab.Navigator>
// 	);
// };

export default HomeScreen;
