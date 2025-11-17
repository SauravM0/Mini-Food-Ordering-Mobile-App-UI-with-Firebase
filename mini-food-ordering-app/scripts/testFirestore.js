// scripts/testFirestore.js
// Script to test Firestore connectivity and read menu items
import { db } from '../src/services/firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';

const testFirestore = async () => {
  try {
    console.log('Testing Firestore connectivity...');
    
    // Try to read menu items
    const menuRef = collection(db, 'menuItems');
    const snapshot = await getDocs(menuRef);
    
    console.log(`Found ${snapshot.size} menu items:`);
    
    snapshot.forEach((doc) => {
      console.log(`- ${doc.id}:`, doc.data());
    });
    
    console.log('Firestore test completed successfully!');
  } catch (error) {
    console.error('Firestore test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
};

// Run the test
testFirestore();