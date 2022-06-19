import { deleteDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from './styles';

export const Transaction = ({ transaction, deleteTransaction }) => {
	const sign = transaction.amount < 0 ? '-' : '+';

	return (
		<View
			style={[
				styles.list,
				styles.boxWithShadow,
				transaction.amount < 0 ? styles.listMinus : styles.listPlus,
			]}>
			<View
				style={[
					{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginRight: 20,
					},
				]}>
				<Text>{transaction.text} </Text>
				<Text>
					{sign}${Math.abs(transaction.amount)}
				</Text>
			</View>
			<Button title='x' onPress={() => deleteTransaction(transaction.id)} />
		</View>
	);
};
