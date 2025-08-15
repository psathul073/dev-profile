import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, get, ref, onValue, runTransaction } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

 // Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

// Initializes Firebase with your credentials.
const app = initializeApp(firebaseConfig);
// Creates a reference to Firebase Realtime Database.
const db = getDatabase(app);
// Firestore database.
const fdb = getFirestore(app);
// Add authentication.
const auth = getAuth(app);


export { db, fdb, auth, signInAnonymously, get, ref, onValue, runTransaction };