import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

// import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyA3KDrEYBZc2gUaxg_GCK1ho0F4PfrWMxg",
	authDomain: "bookreviewbp.firebaseapp.com",
	projectId: "bookreviewbp",
	storageBucket: "bookreviewbp.appspot.com",
	messagingSenderId: "1008036859807",
	appId: "1:1008036859807:web:1782e8e9b941bb070cf7aa"
  };
// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireApp);
export const auth = getAuth(fireApp);
