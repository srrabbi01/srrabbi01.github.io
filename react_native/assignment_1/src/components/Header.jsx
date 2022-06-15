import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

export const Header = () => {
	return (
		<Text style={[styles.header, styles.h2]}>Expense tracker - v1.0.0</Text>
	);
};
