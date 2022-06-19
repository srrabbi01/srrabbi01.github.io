import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

// import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyD36eqmgrSM0PPsyaYVlL6enkk5VzSakeY',
	authDomain: 'rnassignmentbp.firebaseapp.com',
	projectId: 'rnassignmentbp',
	storageBucket: 'rnassignmentbp.appspot.com',
	messagingSenderId: '400909638155',
	appId: '1:400909638155:web:a8ae41dadebe065825c50e',
	measurementId: 'G-D452DLFJPW',
};

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireApp);
export const auth = getAuth(fireApp);
