// scripts/populateMenuItems.js
// Script to populate Firestore with sample menu items
import { db } from '../src/services/firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

const sampleMenuItems = [
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce and mozzarella',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    category: 'Pizza'
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Pizza topped with spicy pepperoni slices',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400',
    category: 'Pizza'
  },
  {
    name: 'Cheeseburger',
    description: 'Juicy beef burger with cheese and fresh vegetables',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'Burgers'
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing and croutons',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    category: 'Salads'
  },
  {
    name: 'Chocolate Milkshake',
    description: 'Creamy chocolate milkshake with whipped cream',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    category: 'Drinks'
  }
];

const populateMenuItems = async () => {
  try {
    const menuRef = collection(db, 'menuItems');
    
    for (const item of sampleMenuItems) {
      const docRef = await addDoc(menuRef, item);
      console.log('Added document with ID:', docRef.id);
    }
    
    console.log('Successfully populated menu items!');
  } catch (error) {
    console.error('Error populating menu items:', error);
  }
};

// Run the script
populateMenuItems();