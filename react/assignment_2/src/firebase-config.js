// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBMkhG5bVfLAZh4En9j-VhKp5oChpHZwgc',
	authDomain: 'bohubrihi-project.firebaseapp.com',
	projectId: 'bohubrihi-project',
	storageBucket: 'bohubrihi-project.appspot.com',
	messagingSenderId: '555360119791',
	appId: '1:555360119791:web:beb1d3a61010b4f497241a',
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);

export const auth = getAuth(fireApp);

export const db = getFirestore(fireApp);
