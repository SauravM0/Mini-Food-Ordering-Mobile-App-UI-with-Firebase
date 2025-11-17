// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your actual Firebase config object from Firebase Console
// Go to Firebase Console -> Project Settings -> General -> Your Apps -> Web app
// Copy the config object and paste it here
const firebaseConfig = {
  apiKey: "API",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: " messagingSenderId",
  appId: "appId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };
