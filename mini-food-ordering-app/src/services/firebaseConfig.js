// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your actual Firebase config object from Firebase Console
// Go to Firebase Console -> Project Settings -> General -> Your Apps -> Web app
// Copy the config object and paste it here
const firebaseConfig = {
  apiKey: "AIzaSyD7_WqXp9CEOeD7hq7MxkwPrPo0slaXmnY",
  authDomain: "mini-food-ordering-olcademy.firebaseapp.com",
  projectId: "mini-food-ordering-olcademy",
  storageBucket: "mini-food-ordering-olcademy.firebasestorage.app",
  messagingSenderId: "407536957432",
  appId: "1:407536957432:web:e8a8a779fb12836d9ac80d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };