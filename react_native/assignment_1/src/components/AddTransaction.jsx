import React, { useState, useContext } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';
// import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	// const { addTransaction } = useContext(GlobalContext);

	const onSubmit = (e) => {
		// e.preventDefault();
		// const newTransaction = {
		// 	id: Math.floor(Math.random() * 100000000),
		// 	text,
		// 	amount: +amount,
		// };
		// addTransaction(newTransaction);
	};

	return (
		<>
			<Text style={[styles.sectionTitle, styles.h3]}>Add new transaction</Text>
			<View>
				<View>
					<Text style={styles.label}>Text</Text>
					<TextInput style={[styles.input]} placeholder='Enter text...' />
				</View>
				<View>
					<Text style={styles.label}>
						amount{'\n'}(negative - expense, positive - income)
					</Text>
					<TextInput style={[styles.input]} placeholder='Enter amount...' />
				</View>
			</View>
			{/* <form onSubmit={onSubmit}>
				<div className='form-control'>
					<label htmlFor='text'>Text</label>
					<input
						type='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Enter text...'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='amount'>
						Amount <br />
						(negative - expense, positive - income)
					</label>
					
					<input
						type='number'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Enter amount...'
					/>
				</div>
				<button className='btn'>Add transaction</button>
			</form> */}
		</>
	);
};
