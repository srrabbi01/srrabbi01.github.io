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
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{ flexDirection: 'row', marginTop: 15 }}>
							<Avatar.Image
								source={{
									uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
								}}
								size={50}
							/>
							<View style={{ marginLeft: 15, flexDirection: 'column' }}>
								<Title style={styles.title}>{user.displayName}</Title>
								<Caption style={styles.caption}>{user.email}</Caption>
							</View>
						</View>

						<View style={styles.row}>
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
						</View>
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<MaterialCommunityIcons
									name='home-outline'
									color={color}
									size={size}
								/>
							)}
							label='Home'
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<MaterialCommunityIcons
									name='bookmark-outline'
									color={color}
									size={size}
								/>
							)}
							label='Bookmarks'
							onPress={() => {
								props.navigation.navigate('BookmarkScreen');
							}}
						/>
					</Drawer.Section>
					<Drawer.Section>
						<DrawerItemList {...props} />
					</Drawer.Section>
					<Drawer.Section title='Preferences'>
						<TouchableRipple onPress={() => {}}>
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
								<View pointerEvents='none'>
									<Switch value={paperTheme.dark} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
					{/* <DrawerItem
					label='Visit Us'
					onPress={() => Linking.openURL('https://aboutreact.com/')}
				/> */}
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
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
				/>
			</Drawer.Section>
		</View>
	);
};

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
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
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	sideMenuProfileIcon: {
		resizeMode: 'center',
		width: 150,
		height: 100,
		borderRadius: 100 / 2,
		// alignSelf: 'center',
		marginTop: 50,
	},
	iconStyle: {
		width: 15,
		height: 15,
		marginHorizontal: 5,
	},
});

export default CustomSidebarMenu;
