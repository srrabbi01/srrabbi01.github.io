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
import { BasicExample } from '../components/Loading';

const HomeScreen = () => {
	const { transactLoading, getTransactions } = useContext(TransactionContext);

	useEffect(() => {
		getTransactions();
	}, []);

	if (transactLoading) return <BasicExample />;

	return (
		<ScrollView>
			<View style={styles.container}>
				{/* <Header /> */}

				<Balance />
				<IncomeExpenses />
				<AddTransaction />
				<TransactionList />
			</View>
		</ScrollView>
	);
};

export default HomeScreen;
