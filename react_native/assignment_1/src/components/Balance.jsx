import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import TransactionContext from '../context/TransactionContext';
import { styles } from './styles';

export const Balance = () => {
	const { transactions } = useContext(TransactionContext);
	const amounts = transactions.map((transaction) => transaction.amount);
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	return (
		<View style={styles.mt1}>
			<Text style={[styles.h4, { textTransform: 'uppercase' }]}>
				Your Balance
			</Text>
			<Text style={styles.h1}>${total}</Text>
		</View>
	);
};
