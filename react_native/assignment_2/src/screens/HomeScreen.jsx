import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { styles } from '../components/styles';
import { BookList } from '../components/BookList';
import BookContext from '../context/BookContext';
import SelectDropdown from 'react-native-select-dropdown';
import { Divider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { OpLoading } from '../components/OpLoading';

const HomeScreen = () => {
	const { crudLoading, getBooks, getFilteredBooks } = useContext(BookContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		getBooks();
	}, [isFocused]);
	const countries = [
		'All Category',
		'Children’s Books',
		'Fantasy and Sci-fi',
		'Romance',
		'Crime and Thriller',
		'Tragedy',
		'Novel',
		'Religious and Self-help',
	];
	if (crudLoading) return <OpLoading />;
	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.container}>
				<Text style={{ fontWeight: '500', fontSize: 15, paddingBottom: 5 }}>
					Browse By Category
				</Text>
				<Divider />
				<SelectDropdown
					data={countries}
					onSelect={(selectedItem, index) => {
						// console.log(selectedItem, index);
						getFilteredBooks(selectedItem);
					}}
					defaultValueByIndex={0}
					buttonTextAfterSelection={(selectedItem, index) => {
						// text represented after item is selected
						// if data array is an array of objects then return selectedItem.property to render after item is selected
						return selectedItem;
					}}
					rowTextForSelection={(item, index) => {
						// text represented for each item in dropdown
						// if data array is an array of objects then return item.property to represent item in dropdown
						return item;
					}}
					buttonStyle={{
						alignSelf: 'center',
						width: '100%',
						marginVertical: 10,
					}}
				/>
				<BookList />
			</View>
		</ScrollView>
	);
};

export default HomeScreen;
