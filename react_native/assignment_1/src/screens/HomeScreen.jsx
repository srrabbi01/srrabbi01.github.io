import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ScrollView } from 'react-native';
import { AddTransaction } from '../components/AddTransaction';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { styles } from '../components/styles';
import { TransactionList } from '../components/TransactionList';

import AuthContext from '../context/AuthContext';
import TransactionContext from '../context/TransactionContext';
import { TransLoading } from '../components/Loading';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

const HomeScreen = () => {
	const { transactLoading, getTransactions } = useContext(TransactionContext);

	useEffect(() => {
		getTransactions();
	}, []);

	if (transactLoading) return <TransLoading />;

	return (
		<ScrollView>
			<View style={styles.container}>
				<Balance />
				<IncomeExpenses />
				<AddTransaction />
				<TransactionList />
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
