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
			<View style={{ justifyContent: 'space-between', flex: 1 }}>
				<Image
					source={{
						uri: book.image,
					}}
					style={styles.bookImage}
				/>
				<View>
					<Text
						style={{
							fontWeight: '500',
							marginTop: 5,
							fontSize: 15,
							textAlign: 'center',
						}}>
						{book.booktitle}
					</Text>
					<Text style={{ fontSize: 12, textAlign: 'center' }}>
						by{' '}
						<Text style={{ fontWeight: '600', marginTop: 5 }}>
							{book.author}
						</Text>
					</Text>
				</View>
				<Text
					style={{
						backgroundColor: '#3F51B5',
						color: '#fff',
						padding: 3,
						textAlign: 'center',
						marginTop:5,
						fontSize:13,
						borderRadius:3
					}}>
					{book.category}
				</Text>
			</View>
		</TouchableRipple>
	);
};
