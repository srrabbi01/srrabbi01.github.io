import 'react-native-gesture-handler';
import './ignoreWarnings';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MainComponent } from './src/MainComponent';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { AuthProvider } from './src/context/AuthContext';
import { BookProvider } from './src/context/BookContext';
import { CommentProvider } from './src/context/CommentContext';

// import { Profile } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<BookProvider>
				<CommentProvider>
					<NavigationContainer>
						<Stack.Navigator initialRouteName='main'>
							<Stack.Screen
								name='login'
								component={LoginScreen}
								options={{ 
									title:'Login',
									headerShown: true }}
							/>
							<Stack.Screen
								name='signup'
								component={SignUpScreen}
								options={{ headerShown: true }}
							/>
							<Stack.Screen
								name='main'
								component={MainComponent}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</CommentProvider>
			</BookProvider>
		</AuthProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
