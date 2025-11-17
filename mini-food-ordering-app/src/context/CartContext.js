// src/context/CartContext.js
import React, { createContext, useContext, useReducer, useMemo } from 'react';

// Define the initial cart state
const initialState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
};

// Create the cart context
const CartContext = createContext();

// Action types
const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// Cart reducer to manage state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM: {
      const { item, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Item already exists in cart, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // New item, add to cart
        updatedItems = [
          ...state.items,
          {
            ...item,
            quantity,
            subtotal: item.price * quantity,
          },
        ];
      }

      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case actionTypes.REMOVE_ITEM: {
      const { itemId } = action.payload;
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case actionTypes.INCREASE_QUANTITY: {
      const { itemId } = action.payload;
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
            subtotal: item.price * newQuantity,
          };
        }
        return item;
      });

      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case actionTypes.DECREASE_QUANTITY: {
      const { itemId } = action.payload;
      const updatedItems = state.items
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = Math.max(0, item.quantity - 1);
            return {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity > 0 ? item.price * newQuantity : 0,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with zero quantity

      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case actionTypes.CLEAR_CART: {
      return { ...initialState };
    }

    default:
      return state;
  }
};

// Helper function to calculate cart totals
const calculateCartTotals = (state) => {
  const totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  const subtotal = state.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return {
    ...state,
    totalQuantity,
    subtotal,
  };
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Action creators
  const addItem = (item, quantity = 1) => {
    dispatch({
      type: actionTypes.ADD_ITEM,
      payload: { item, quantity },
    });
  };

  const removeItem = (itemId) => {
    dispatch({
      type: actionTypes.REMOVE_ITEM,
      payload: { itemId },
    });
  };

  const increaseQuantity = (itemId) => {
    dispatch({
      type: actionTypes.INCREASE_QUANTITY,
      payload: { itemId },
    });
  };

  const decreaseQuantity = (itemId) => {
    dispatch({
      type: actionTypes.DECREASE_QUANTITY,
      payload: { itemId },
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionTypes.CLEAR_CART,
    });
  };

  const getItemQuantity = (itemId) => {
    const item = state.items.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getItemQuantity,
    }),
    [state]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;