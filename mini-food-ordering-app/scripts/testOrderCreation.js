// scripts/testOrderCreation.js
import { db } from '../src/services/firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const testOrderCreation = async () => {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      items: [
        {
          menuItemId: "1",
          name: "Test Item",
          price: 10.99,
          quantity: 2,
          subtotal: 21.98
        }
      ],
      totalAmount: 21.98,
      customerName: "Test Customer",
      customerPhone: "123-456-7890",
      notes: "Test order",
      source: 'test_script',
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    
    console.log('Order created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating test order:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
};

// Run the test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testOrderCreation()
    .then(() => console.log('Test completed successfully'))
    .catch(error => console.error('Test failed:', error));
}

export default testOrderCreation;