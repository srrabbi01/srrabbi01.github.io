import {
	View,
	Text,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { styles } from '../components/styles';
import {
	TextInput,
	List,
	Divider,
	ActivityIndicator,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import CommentContext from '../context/CommentContext';
import { useIsFocused } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

const DetailsBookScreen = ({ route, navigation }) => {
	const { id, booktitle, author, category, image } = route.params;
	const [comment, setComment] = useState('');
	const { user } = useContext(AuthContext);
	const { comments, getComments, loading } = useContext(CommentContext);
	const isFocused = useIsFocused();
	// console.log(route.params)
	useEffect(() => {
		getComments(id);
	}, [isFocused]);

	const handleSubmit = async () => {
		// setCRUDLoading(true);
		if (comment !== '') {
			await addDoc(collection(db, 'comment'), {
				bookId: id,
				user: user.displayName,
				userId: user.uid,
				comment: comment,
				createdAt: new Date(),
			});
			setComment('');
			getComments(id);
			// setCRUDLoading(false);
			alert('Transactions add successfully');
		} else alert('Comment cannot be empty.');
	};
	if (loading) return <LoadingScreen />;
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} enabled>
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={stylesInt.DetailsBookContainer}>
						<Image
							source={{
								uri: image,
							}}
							style={styles.bookImage}
						/>
						<View style={stylesInt.bookInfoContainer}>
							<Text
								style={{
									fontSize: 24,
									fontWeight: '600',
									textAlign: 'center',
								}}>
								{booktitle}
							</Text>
							<Text style={{ fontSize: 18 }}>
								by{' '}
								<Text style={{ fontWeight: '600', marginTop: 5 }}>
									{author}
								</Text>
							</Text>
							<Text
								style={{
									fontWeight: '600',
									marginTop: 5,
									backgroundColor: '#3F51A5',
									color: '#fff',
									padding: 3,
									paddingHorizontal: 15,
									textAlign: 'center',
									marginTop: 5,
									fontSize: 13,
									borderRadius: 3,
								}}>
								{category}
							</Text>
						</View>

						<List.Section style={stylesInt.commentContainer}>
							<List.Subheader>Review - {comments.length}</List.Subheader>
							<Divider />
							{comments.map((item) => {
								return (
									<List.Item
										key={item.id}
										title={item.user}
										description={item.comment}
										left={() => (
											<MaterialCommunityIcons
												style={{ paddingVertical: 10 }}
												name='account-circle'
												size={28}
											/>
										)}
									/>
								);
							})}
						</List.Section>
						{user ? (
							<View>
								<TextInput
									label='Share your Review'
									value={comment}
									style={{ marginVertical: 20 }}
									onChangeText={(value) => setComment(value)}
								/>
								<Button
									onPress={() => handleSubmit()}
									title='Share'
									color='#0091EA'
									accessibilityLabel='Learn more about this purple button'
								/>
							</View>
						) : (
							<TouchableOpacity
								onPress={() => navigation.navigate('login', { goBack: true })}>
								<Text>
									Please login for review{' '}
									<Text style={{ color: '#0091EA', fontWeight: '600' }}>
										Login
									</Text>
								</Text>
							</TouchableOpacity>
						)}
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default DetailsBookScreen;

const stylesInt = StyleSheet.create({
	DetailsBookContainer: {
		padding: 20,
		flex: 1,
	},
	bookInfoContainer: {
		alignItems: 'center',
		textAlign: 'center',
		marginVertical: 10,
	},
	commentContainer: {
		marginVertical: 20,
	},
});
