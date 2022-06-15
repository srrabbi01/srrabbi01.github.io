import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
// import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
	// const { transactions } = useContext(GlobalContext);

	// const amounts = transactions.map((transaction) => transaction.amount);

	// const income = amounts
	// 	.filter((item) => item > 0)
	// 	.reduce((acc, item) => (acc += item), 0)
	// 	.toFixed(2);

	// const expense = (
	// 	amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
	// 	-1
	// ).toFixed(2);

	const income = 0;
	const expense = 0;
	return (
		<View style={[styles.incExpContainer, styles.boxWithShadow]}>
			<View
				style={[
					styles.incExpContainerChild,
					{ borderRightWidth: 2, borderColor: '#ccc' },
				]}>
				<Text style={styles.h4}>Income</Text>
				<Text style={[styles.money, styles.plus]}>{income}</Text>
			</View>
			<View style={styles.incExpContainerChild}>
				<Text style={styles.h4}>Expense</Text>
				<Text style={[styles.money, styles.minus]}>{expense}</Text>
			</View>
		</View>
	);
};
