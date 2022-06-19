import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import AuthContext from './AuthContext';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);
	const [transactLoading, setTransactLoading] = useState(false);
	const { user } = useContext(AuthContext);

	const getTransactions = async () => {
		const transactionQuery = query(
			collection(db, 'transaction'),
			where('userId', '==', user.uid),
		);

		const data = await getDocs(transactionQuery);
		const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		setTransactions(getData);
	};

	return (
		<TransactionContext.Provider
			value={{
				transactions,
				transactLoading,
				getTransactions,
				setTransactLoading,
			}}>
			{children}
		</TransactionContext.Provider>
	);
};

export default TransactionContext;
