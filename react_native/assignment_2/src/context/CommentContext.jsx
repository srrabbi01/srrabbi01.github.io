import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);

	const getComments = async (bookId) => {
		setLoading(true)
		const commentQuery = query(
			collection(db, 'comment'),
			where('bookId', '==', bookId),
		);

		const data = await getDocs(commentQuery);
		const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		setComments(getData);
		setLoading(false)
	};

	return (
		<CommentContext.Provider
			value={{
				comments,
				loading,
				getComments,
			}}>
			{children}
		</CommentContext.Provider>
	);
};

export default CommentContext;
