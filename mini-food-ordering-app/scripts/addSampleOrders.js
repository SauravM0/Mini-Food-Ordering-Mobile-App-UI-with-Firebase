// scripts/addSampleOrders.js
import { db } from '../src/services/firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const addSampleOrders = async () => {
  try {
    // Add multiple sample orders
    const sampleOrders = [
      {
        items: [
          {
            menuItemId: "1",
            name: "Burger",
            price: 8.99,
            quantity: 1,
            subtotal: 8.99
          },
          {
            menuItemId: "2",
            name: "Fries",
            price: 3.99,
            quantity: 2,
            subtotal: 7.98
          }
        ],
        totalAmount: 19.96,
        customerName: "John Doe",
        customerPhone: "555-1234",
        notes: "Extra ketchup packets",
        source: 'mobile_app',
        status: 'completed',
        createdAt: serverTimestamp(),
      },
      {
        items: [
          {
            menuItemId: "3",
            name: "Pizza",
            price: 12.99,
            quantity: 1,
            subtotal: 12.99
          }
        ],
        totalAmount: 15.98,
        customerName: "John Doe",
        customerPhone: "555-1234",
        notes: "Extra cheese",
        source: 'mobile_app',
        status: 'pending',
        createdAt: serverTimestamp(),
      },
      {
        items: [
          {
            menuItemId: "4",
            name: "Salad",
            price: 7.99,
            quantity: 1,
            subtotal: 7.99
          },
          {
            menuItemId: "5",
            name: "Smoothie",
            price: 4.99,
            quantity: 1,
            subtotal: 4.99
          }
        ],
        totalAmount: 15.97,
        customerName: "John Doe",
        customerPhone: "555-1234",
        notes: "No nuts",
        source: 'mobile_app',
        status: 'cancelled',
        createdAt: serverTimestamp(),
      }
    ];

    // Add each order
    for (let i = 0; i < sampleOrders.length; i++) {
      const order = sampleOrders[i];
      const docRef = await addDoc(collection(db, 'orders'), order);
      console.log(`Order ${i + 1} created with ID:`, docRef.id);
    }

    console.log('All sample orders created successfully!');
  } catch (error) {
    console.error('Error creating sample orders:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
};

// Run the function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addSampleOrders()
    .then(() => console.log('Sample orders added successfully'))
    .catch(error => console.error('Failed to add sample orders:', error));
}

export default addSampleOrders;