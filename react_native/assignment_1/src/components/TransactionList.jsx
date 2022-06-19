import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { db } from '../../firebase.config';
import TransactionContext from '../context/TransactionContext';
import { styles } from './styles';
import { Transaction } from './Transaction';

export const TransactionList = () => {
	const { transactions, getTransactions, setTransactLoading } =
		useContext(TransactionContext);

	const deleteTransaction = (transactionId) => {
		Alert.alert('Delete', 'Are you sure you want to delete?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: async () => {
					setTransactLoading(true);
					const transactionDoc = doc(db, 'transaction', transactionId);
					await deleteDoc(transactionDoc);
					getTransactions();
					setTransactLoading(false);
				},
			},
		]);
	};

	return (
		<>
			<Text style={[styles.sectionTitle, styles.h3]}>History</Text>
			<View>
				{transactions.map((transaction) => (
					<Transaction
						key={transaction.id}
						transaction={transaction}
						deleteTransaction={deleteTransaction}
					/>
				))}
			</View>
		</>
	);
};
