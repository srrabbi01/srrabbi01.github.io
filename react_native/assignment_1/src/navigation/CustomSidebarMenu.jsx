// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useContext } from 'react';
import {
	SafeAreaView,
	View,
	StyleSheet,
	Image,
	Text,
	Linking,
} from 'react-native';

import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { Logout } from '../auth/logout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from '../components/Profile';
import {
	Avatar,
	Caption,
	Drawer,
	Paragraph,
	Title,
	TouchableRipple,
	Switch,
	useTheme,
} from 'react-native-paper';
import AuthContext from '../context/AuthContext';

const CustomSidebarMenu = (props) => {
	const paperTheme = useTheme();
	const { user, handleLogout } = useContext(AuthContext);
	const BASE_PATH =
		'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
	const proileImage = 'react_logo.png';

	return (
		<View style={{ flex: 1, padding: 5 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{ marginTop: 15 }}>
							<Avatar.Image
								source={{
									uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
								}}
								size={100}
							/>
							<View style={{ marginTop: 10, flexDirection: 'column' }}>
								<Title style={styles.title}>{user.displayName}</Title>
								<Caption style={styles.caption}>{user.email}</Caption>
							</View>
						</View>

						{/* <View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>
									80
								</Paragraph>
								<Caption style={styles.caption}>Following</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>
									100
								</Paragraph>
								<Caption style={styles.caption}>Followers</Caption>
							</View>
						</View> */}
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItemList {...props} />
						{/* <DrawerItem
							icon={({ focused, color, size }) => (
								<MaterialCommunityIcons
									name={focused ? 'home-outline' : 'home'}
									color={color}
									size={size}
								/>
							)}
							activeTintColor='red'
							activeBackgroundColor='blue'
							label='Home'
							onPress={() => {
								props.navigation.navigate('home');
							}}
						/> */}
					</Drawer.Section>

					{/* <Drawer.Section title='Preferences'>
						<TouchableRipple onPress={() => {}}>
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
								<View pointerEvents='none'>
									<Switch value={paperTheme.dark} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section> */}
					{/* <DrawerItem
					label='Visit Us'
					onPress={() => Linking.openURL('https://aboutreact.com/')}
				/> */}
				</View>
			</DrawerContentScrollView>
			<DrawerItem
				icon={({ color, size }) => (
					<MaterialCommunityIcons
						name='exit-to-app'
						color={color}
						size={size}
					/>
				)}
				label='Sign Out'
				onPress={() => handleLogout(props.navigation)}
				style={{ padding: 0 }}
			/>
			{/* <Drawer.Section style={styles.bottomDrawerSection}>
				
			</Drawer.Section> */}
		</View>
	);
};

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingHorizontal: 10,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 30,
	},
	bottomDrawerSection: {
		marginBottom: -5,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});

export default CustomSidebarMenu;
