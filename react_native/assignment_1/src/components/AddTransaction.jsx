import React, { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import AuthContext from '../context/AuthContext';
import TransactionContext from '../context/TransactionContext';
import LoadingScreen from '../screens/LoadingScreen';

export const AddTransaction = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);
	const { user } = useContext(AuthContext);
	const { getTransactions, setTransactLoading } =
		useContext(TransactionContext);

	const handleSubmit = async () => {
		setTransactLoading(true);
		await addDoc(collection(db, 'transaction'), {
			userId: user.uid,
			text: text,
			amount: parseFloat(amount),
			createdAt: new Date(),
		});
		setText('');
		setAmount(0);
		getTransactions();
		setTransactLoading(false);
		alert('Transactions add successfully');
	};
	
	return (
		<>
			<Text style={[styles.sectionTitle, styles.h3]}>Add new transaction</Text>
			<View>
				<View>
					<Text style={styles.label}>Text</Text>
					<TextInput
						value={text}
						onChangeText={(value) => setText(value)}
						style={[styles.input]}
						placeholder='Enter text...'
					/>
				</View>
				<View>
					<Text style={styles.label}>
						Amount{'\n'}(negative - expense, positive - income)
					</Text>
					<TextInput
						keyboardType='numeric'
						value={amount.toString()}
						onChangeText={(value) => setAmount(value)}
						style={[styles.input]}
						placeholder='Enter amount...'
					/>
				</View>
			</View>
			<Button
				onPress={handleSubmit}
				title='Add Transaction'
				color='#444'
				accessibilityLabel='Learn more about this purple button'
			/>
		</>
	);
};
