import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
// import { GlobalContext } from '../context/GlobalState';

export const Transaction = () => {
	//   const { deleteTransaction } = useContext(GlobalContext);

	// const sign = transaction.amount < 0 ? '-' : '+';

	return (
		<View style={[styles.list,styles.boxWithShadow]}>
			<Text>Food</Text>
			<Text>-$34</Text>
			{/* {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button> */}
		</View>
	);
};
