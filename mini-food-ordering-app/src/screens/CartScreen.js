// src/screens/CartScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import CartItemRow from '../components/CartItemRow';
import PriceSummary from '../components/PriceSummary';
import InfoBanner from '../components/InfoBanner';
import { LoadingIndicator } from '../components';
import { useCart } from '@/src/context/CartContext';
import { useRouter } from 'expo-router';

const CartScreen = () => {
  const { items: cartItems, subtotal, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const tax = subtotal * 0.08;
  const delivery = 2.99;
  const total = subtotal + tax + delivery;

  const handleIncrement = (id) => {
    // Validate item exists before incrementing
    const item = cartItems.find(item => item.id === id);
    if (!item) {
      console.warn('Attempted to increment non-existent item:', id);
      return;
    }
    increaseQuantity(id);
  };

  const handleDecrement = (id) => {
    // Validate item exists before decrementing
    const item = cartItems.find(item => item.id === id);
    if (!item) {
      console.warn('Attempted to decrement non-existent item:', id);
      return;
    }
    
    // If quantity is 1, confirm before removing
    if (item.quantity === 1) {
      Alert.alert(
        "Remove Item",
        `Are you sure you want to remove "${item.name}" from your cart?`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => removeItem(id)
          }
        ]
      );
    } else {
      decreaseQuantity(id);
    }
  };

  const handleRemove = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) {
      console.warn('Attempted to remove non-existent item:', id);
      return;
    }
    
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove "${item.name}" from your cart?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeItem(id)
        }
      ]
    );
  };

  const handleProceedToSummary = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart before proceeding.");
      return;
    }
    
    if (isNaN(total) || total <= 0) {
      Alert.alert("Invalid Cart", "There's an issue with your cart total. Please review your items.");
      return;
    }
    
    setProcessing(true);
    // Add a small delay to show the loading state
    setTimeout(() => {
      setProcessing(false);
      router.push('/order-summary');
    }, 500);
  };

  // Show loading indicator while processing
  if (processing) {
    return (
      <ScreenContainer>
        <LoadingIndicator message="Processing..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <AppText variant="heading" style={styles.title}>Your Cart</AppText>
      
      {cartItems.length === 0 ? (
        <View style={styles.centered}>
          <InfoBanner 
            message="Your cart is empty. Add something from the menu!" 
            type="info" 
          />
          <AppButton
            text="Browse Menu"
            onPress={() => router.push('/')}
            variant="primary"
            fullWidth
            style={styles.button}
          />
        </View>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              subtotal={item.subtotal}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
          
          <PriceSummary
            subtotal={subtotal}
            tax={tax}
            delivery={delivery}
            total={total}
            note="Taxes and delivery fees included"
          />
          
          <AppButton
            text={processing ? "Processing..." : "Proceed to Order Summary"}
            onPress={handleProceedToSummary}
            variant="primary"
            fullWidth
            style={styles.button}
            disabled={cartItems.length === 0 || processing}
          />
        </>
      )}
      
      <AppButton
        text="Back to Menu"
        onPress={() => router.push('/')}
        variant="outlined"
        fullWidth
        style={styles.button}
        disabled={processing}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  button: {
    marginTop: 16,
  },
});

export default CartScreen;