import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
	const [books, setBooks] = useState([]);
	const [crudLoading, setCRUDLoading] = useState(false);

	const getBooks = async () => {
		const bookQuery = query(
			collection(db, 'book'),
			// where('userId', '==', user.uid),
		);

		const data = await getDocs(bookQuery);
		const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		setBooks(getData);
	};
	const getFilteredBooks = async (category) => {
		if (category == 'All Category') {
			getBooks();
		} else {
			const bookQuery = query(
				collection(db, 'book'),
				where('category', '==', category),
			);
			const data = await getDocs(bookQuery);
			const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setBooks(getData);
		}
	};

	return (
		<BookContext.Provider
			value={{
				books,
				crudLoading,
				getBooks,
				getFilteredBooks,
				setCRUDLoading,
			}}>
			{children}
		</BookContext.Provider>
	);
};

export default BookContext;
