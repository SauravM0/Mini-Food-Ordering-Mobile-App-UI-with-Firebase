// src/services/firestore.js
import { db } from './firebaseConfig';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Subscribe to real-time updates of menu items
 * @param {function} onUpdate - Callback function to receive updated menu items array
 * @param {function} onError - Optional callback function to handle errors
 * @returns {function} Unsubscribe function to stop listening to updates
 */
export const subscribeToMenuItems = (onUpdate, onError) => {
  try {
    const menuRef = collection(db, 'menuItems');
    const q = query(menuRef, orderBy('name')); // or createdAt if available

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Filter out any documents that don't have required fields
        const items = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => 
            item.name && 
            typeof item.price === 'number' && 
            item.description
          );
          
        if (onUpdate) {
          onUpdate(items);
        }
      },
      (error) => {
        console.error('Error listening to menuItems:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        if (onError) {
          onError(error);
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('subscribeToMenuItems setup error:', error);
    if (onError) {
      onError(error);
    }
    // return no-op unsubscribe to avoid crashes
    return () => {};
  }
};

/**
 * Fetch menu items once (non real-time)
 * @returns {Promise<Array>} Promise that resolves to an array of menu items
 */
export const getMenuItemsOnce = async () => {
  try {
    const menuRef = collection(db, 'menuItems');
    const q = query(menuRef, orderBy('name'));
    const snapshot = await getDocs(q);

    // Filter out any documents that don't have required fields
    const items = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((item) => 
        item.name && 
        typeof item.price === 'number' && 
        item.description
      );

    return items;
  } catch (error) {
    console.error('Error fetching menuItems:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
};

/**
 * Fetch orders for a specific user (non real-time)
 * @returns {Promise<Array>} Promise that resolves to an array of orders
 */
export const getOrdersOnce = async () => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    // Map documents to order objects
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
};

/**
 * Subscribe to real-time updates of orders
 * @param {function} onUpdate - Callback function to receive updated orders array
 * @param {function} onError - Optional callback function to handle errors
 * @returns {function} Unsubscribe function to stop listening to updates
 */
export const subscribeToOrders = (onUpdate, onError) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Map documents to order objects
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
          
        if (onUpdate) {
          onUpdate(orders);
        }
      },
      (error) => {
        console.error('Error listening to orders:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        if (onError) {
          onError(error);
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('subscribeToOrders setup error:', error);
    if (onError) {
      onError(error);
    }
    // return no-op unsubscribe to avoid crashes
    return () => {};
  }
};

/**
 * Create a new order document in Firestore
 * @param {Object} orderData - The order data to save
 * @returns {Promise<string>} Promise that resolves to the newly created document ID
 */
export const createOrder = async (orderData) => {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      status: orderData.status || 'pending',
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
};