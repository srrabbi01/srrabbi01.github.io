// import React, {useContext} from 'react'

import { Text, View } from 'react-native';
import { styles } from './styles';

// import { GlobalContext } from '../context/GlobalState';
export const Balance = () => {
	//   const { transactions } = useContext(GlobalContext);
	//   const amounts = transactions.map(transaction => transaction.amount);

	//   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
	const total = 0;
	return (
		<View style={styles.mt1}>
			<Text style={[styles.h4, { textTransform: 'uppercase' }]}>
				Your Balance
			</Text>
			<Text style={styles.h1}>${total}</Text>
		</View>
	);
};
