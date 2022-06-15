import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ScrollView } from 'react-native';
import { AddTransaction } from './components/AddTransaction';
import { Balance } from './components/Balance';
import { Header } from './components/Header';
import { IncomeExpenses } from './components/IncomeExpenses';
import { styles } from './components/styles';
import { TransactionList } from './components/TransactionList';

export const MainComponent = () => {
	const onPressLearnMore = () => {};
	return (
		<ScrollView>
			<View style={styles.container}>
				<Header />
				<Balance />
				<IncomeExpenses />
				<AddTransaction />
				<StatusBar style='auto' />
				<Button
					onPress={onPressLearnMore}
					title='Add Transaction'
					color='#444'
					accessibilityLabel='Learn more about this purple button'
				/>
				<TransactionList />
			</View>
		</ScrollView>
	);
};
