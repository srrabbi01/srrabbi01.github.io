import React, { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { styles } from '../components/styles';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import AuthContext from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import BookContext from '../context/BookContext';
import { OpLoading } from '../components/OpLoading';

export const AddBookScreen = () => {
	const [booktitle, setBooktitle] = useState('');
	const [author, setAuthor] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('');
	const { user } = useContext(AuthContext);
	const { crudLoading, getBooks, setCRUDLoading } = useContext(BookContext);

	// const { getTransactions, setTransactLoading } =
	// 	useContext(TransactionContext);

	const handleSubmit = async () => {
		setCRUDLoading(true);
		await addDoc(collection(db, 'book'), {
			// userId: user.uid,
			booktitle: booktitle,
			author: author,
			category: category,
			image: image,
			createdAt: new Date(),
		});
		setBooktitle('');
		setAuthor('');
		setCategory('');
		setImage('');

		// getTransactions();
		setCRUDLoading(false);
		alert('Transactions add successfully');
	};
	// if (crudLoading) return <OpLoading />;
	return (
		<View style={styles.container}>
			<Text style={[styles.sectionTitle, styles.h3]}>Add new transaction</Text>
			<View>
				<View>
					<Text style={styles.label}>Book Title</Text>
					<TextInput
						value={booktitle}
						onChangeText={(value) => setBooktitle(value)}
						style={[styles.input]}
						placeholder='Enter text...'
					/>
				</View>

				<View>
					<Text style={styles.label}>Author</Text>
					<TextInput
						value={author}
						onChangeText={(value) => setAuthor(value)}
						style={[styles.input]}
						placeholder='Enter author name...'
					/>
				</View>
				<View>
					<Text style={styles.label}>Category</Text>
					<TextInput
						value={category}
						onChangeText={(value) => setCategory(value)}
						style={[styles.input]}
						placeholder='Enter author name...'
					/>
				</View>
				<View>
					<Text style={styles.label}>Image Link</Text>
					<TextInput
						value={image}
						onChangeText={(value) => setImage(value)}
						style={[styles.input]}
						placeholder='Enter Image Url...'
					/>
				</View>
			</View>
			<Button
				onPress={handleSubmit}
				title='Add Transaction'
				color='#444'
				accessibilityLabel='Learn more about this purple button'
			/>
		</View>
	);
};
