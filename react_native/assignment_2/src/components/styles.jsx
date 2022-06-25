import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'flex-start',
		padding: 10,
		// paddingTop: 50,
	},
	h1: {
		fontSize: 32,
		fontWeight: '600',
	},
	h2: {
		fontSize: 24,
		fontWeight: '600',
	},
	h3: {
		fontSize: 18.72,
		fontWeight: '600',
	},
	h4: {
		fontSize: 16,
		fontWeight: '600',
	},
	h5: {
		fontSize: 13.28,
		fontWeight: '600',
	},
	h5: {
		fontSize: 12,
		fontWeight: '600',
	},
	m0: {
		margin: 0,
	},
	mt1: {
		marginTop: 10,
	},
	mt2: {
		marginTop: 20,
	},
	boxWithShadow: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},

	sectionTitle: {
		borderBottomColor: '#bbb',
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginTop: 10,
		marginBottom: 10,
	},

	label: {
		marginTop: 10,
		marginBottom: 5,
		textTransform: 'capitalize',
	},
	input: {
		borderColor: '#dedede',
		borderWidth: 1,
		borderRadius: 2,
		fontSize: 16,
		padding: 10,
		marginBottom: 10,
		width: '100%',
	},
	bookContainer: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	bookItemContainer: {
		width: '48%',
		// marginVertical: '1%',
		marginBottom: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 5,
		borderRadius: 4,
		textAlign: 'center',
		alignItems: 'center',
	},
	bookImage: {
		width: '100%',
		aspectRatio: 333 / 499,
	},
});
