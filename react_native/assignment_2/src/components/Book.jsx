import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { styles } from './styles';

export const Book = ({ book }) => {
	const navigation = useNavigation();
	const onBookPress = () => {
		navigation.navigate('detailsbook', { ...book });
	};
	return (
		<TouchableRipple
			style={styles.bookItemContainer}
			onPress={() => onBookPress()}>
			<View>
				<Image
					source={{
						uri: book.image,
					}}
					style={styles.bookImage}
				/>
				<Text style={{ fontWeight: '500', marginTop: 5, fontSize: 15 }}>
					{book.booktitle}
				</Text>
				<Text style={{ fontSize: 13 }}>
					by{' '}
					<Text style={{ fontWeight: '600', marginTop: 5 }}>{book.author}</Text>
				</Text>
			</View>
		</TouchableRipple>
	);
};
