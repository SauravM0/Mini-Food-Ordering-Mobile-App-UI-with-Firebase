// scripts/cleanupFirestore.js
// Script to clean up invalid documents from Firestore
import { db } from '../src/services/firebaseConfig.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const cleanupFirestore = async () => {
  try {
    console.log('Cleaning up Firestore...');
    
    // Get all documents in menuItems collection
    const menuRef = collection(db, 'menuItems');
    const snapshot = await getDocs(menuRef);
    
    console.log(`Found ${snapshot.size} documents in menuItems collection`);
    
    let deletedCount = 0;
    
    for (const document of snapshot.docs) {
      const data = document.data();
      
      // Check if this is a valid menu item
      const isValidMenuItem = 
        data.name && 
        typeof data.price === 'number' && 
        data.description &&
        typeof data.name === 'string' &&
        data.name.length > 0;
      
      // If it's the template document with ID "menuItems", delete it
      if (document.id === 'menuItems' || !isValidMenuItem) {
        console.log(`Deleting invalid document: ${document.id}`);
        await deleteDoc(doc(db, 'menuItems', document.id));
        deletedCount++;
      }
    }
    
    console.log(`Cleanup completed. Deleted ${deletedCount} invalid documents.`);
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
};

// Run the cleanup
cleanupFirestore();