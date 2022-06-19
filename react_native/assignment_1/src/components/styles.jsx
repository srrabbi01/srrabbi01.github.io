import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		// flex: 0,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'flex-start',
		padding: 15,
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
	header: {
		marginBottom: 20,
	},
	incExpContainer: {
		backgroundColor: '#fff',
		padding: 20,
		// flex: 0,
		justifyContent: 'space-around',
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 10,
		alignItems: 'flex-start',
		// maxHeight: 100,
	},
	incExpContainerChild: {
		// flex: 1,
		textAlign: 'center',
		alignItems: 'center',
		width: '50%',
	},

	money: {
		fontSize: 20,
		letterSpacing: 1,
		margin: 5,
	},

	plus: {
		color: '#2ecc71',
	},

	minus: {
		color: '#c0392b',
	},
	sectionTitle: {
		borderBottomColor: '#bbb',
		borderBottomWidth: 1,
		paddingBottom: 10,
		marginTop: 40,
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
	list: {
		backgroundColor: '#eee',
		color: '#333',
		justifyContent: 'space-between',
		flexDirection: 'row',
		position: 'relative',
		padding: 10,
		marginTop: 10,
		// marginBottom: 10,
	},
	listMinus: {
		borderColor: '#c0392b',
		borderEndWidth: 5,
	},
	listPlus: {
		borderColor: '#2ecc71',
		borderEndWidth: 5,
	},
});
