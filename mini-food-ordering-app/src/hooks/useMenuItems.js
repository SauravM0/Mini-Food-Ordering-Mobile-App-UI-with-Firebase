// src/hooks/useMenuItems.js
import { useEffect, useState } from 'react';
import { subscribeToMenuItems, getMenuItemsOnce } from '../services/firestore';

/**
 * Custom hook to manage menu items with loading and error states
 * @param {number} retryCount - A counter to trigger retries
 * @returns {Object} Object containing menuItems, loading, and error states
 */
const useMenuItems = (retryCount = 0) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset loading and error states when retrying
    setLoading(true);
    setError(null);
    
    const unsubscribe = subscribeToMenuItems(
      (items) => {
        setMenuItems(items);
        setLoading(false);
      },
      async (err) => {
        console.warn('Real-time menu updates failed, trying one-time fetch:', err);
        // Fallback to one-time fetch if real-time subscription fails
        try {
          const items = await getMenuItemsOnce();
          setMenuItems(items);
          setLoading(false);
        } catch (fetchError) {
          console.error('One-time fetch also failed:', fetchError);
          // If both fail, use mock data as last resort
          const mockMenuItems = [
            {
              id: '1',
              name: 'Margherita Pizza',
              description: 'Classic pizza with tomato sauce and mozzarella',
              price: 12.99,
              image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
              category: 'Pizza'
            },
            {
              id: '2',
              name: 'Cheeseburger',
              description: 'Juicy beef burger with cheese and fresh vegetables',
              price: 9.99,
              image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
              category: 'Burgers'
            },
            {
              id: '3',
              name: 'Caesar Salad',
              description: 'Fresh romaine lettuce with Caesar dressing and croutons',
              price: 8.99,
              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
              category: 'Salads'
            }
          ];
          setMenuItems(mockMenuItems);
          setLoading(false);
          setError(fetchError);
        }
      }
    );

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [retryCount]);

  return { menuItems, loading, error };
};

export default useMenuItems;