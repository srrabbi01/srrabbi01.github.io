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
import { TransactionProvider } from './src/context/TransactionContext';

// import { Profile } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<TransactionProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='login'>
						<Stack.Screen
							name='login'
							component={LoginScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='signup'
							component={SignUpScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='main'
							component={MainComponent}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</TransactionProvider>
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
