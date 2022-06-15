import React, { useContext } from 'react';
// import { Transaction } from './Transaction';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Transaction } from './Transaction';

export const TransactionList = () => {
	//   const { transactions } = useContext(GlobalContext);

	return (
		<>
			<Text style={[styles.sectionTitle, styles.h3]}>History</Text>
			<View>
				<Transaction />
				<Transaction />
				{/* {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))} */}
			</View>
		</>
	);
};
