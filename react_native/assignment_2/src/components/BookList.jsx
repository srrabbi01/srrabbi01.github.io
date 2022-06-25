import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { db } from '../../firebase.config';
import BookContext from '../context/BookContext';
import { styles } from './styles';
import { Book } from './Book';

export const BookList = () => {
	const { books, getBooks, setCRUDLoading } = useContext(BookContext);

	const deleteBook = (bookId) => {
		Alert.alert('Delete', 'Are you sure you want to delete?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: async () => {
					setCRUDLoading(true);
					const bookDoc = doc(db, 'book', bookId);
					await deleteDoc(bookDoc);
					getBooks();
					setCRUDLoading(false);
				},
			},
		]);
	};

	return (
		<>
			{/* <Text style={[styles.sectionTitle, styles.h3]}>Popular Books</Text> */}
			<View style={styles.bookContainer}>
				{books.length !== 0 ? (
					books.map((book) => (
						<Book key={book.id} book={book} deleteBook={deleteBook} />
					))
				) : (
					<View
						style={{
							marginTop: 100,
						}}>
						<Text>No book found !!!</Text>
					</View>
				)}
			</View>
		</>
	);
};
