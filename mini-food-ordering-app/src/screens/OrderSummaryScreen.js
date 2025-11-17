// src/screens/OrderSummaryScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { CartItemRow, ReadOnlyCartItemRow, LoadingIndicator } from '../components';
import PriceSummary from '../components/PriceSummary';
import InfoBanner from '../components/InfoBanner';
import { useCart } from '@/src/context/CartContext';
import { useRouter } from 'expo-router';
import { createOrder } from '../services/firestore';

const OrderSummaryScreen = () => {
  const { items: orderItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  
  // Customer details state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const tax = subtotal * 0.08;
  const delivery = 2.99;
  const total = subtotal + tax + delivery;

  // Check if cart is empty
  const isCartEmpty = orderItems.length === 0;

  // Validate customer details
  const validateCustomerDetails = () => {
    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');
    
    // Check if name is provided (optional in this implementation)
    if (customerName.trim() && customerName.trim().length < 2) {
      setErrorMessage('Please enter a valid name (at least 2 characters).');
      return false;
    }
    
    // Check if phone is provided and valid (optional in this implementation)
    if (customerPhone.trim() && !/^\d{10,15}$/.test(customerPhone.trim())) {
      setErrorMessage('Please enter a valid phone number (10-15 digits).');
      return false;
    }
    
    return true;
  };

  // Handle order placement
  const handlePlaceOrder = async () => {
    // Reset messages
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validate cart
    if (isCartEmpty) {
      setErrorMessage('Your cart is empty. Add items before placing an order.');
      return;
    }
    
    // Validate total
    if (isNaN(total) || total <= 0) {
      setErrorMessage('Invalid order total. Please check your cart.');
      return;
    }
    
    // Validate customer details
    if (!validateCustomerDetails()) {
      return;
    }
    
    try {
      setIsPlacingOrder(true);
      
      // Transform cart items to order items
      const orderItemsFormatted = orderItems.map(item => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: parseFloat((item.price * item.quantity).toFixed(2))
      }));
      
      // Create order object
      const orderData = {
        items: orderItemsFormatted,
        totalAmount: parseFloat(total.toFixed(2)),
        customerName: customerName.trim() || null,
        customerPhone: customerPhone.trim() || null,
        notes: notes.trim() || null,
        source: 'mobile_app',
        status: 'pending'
      };
      
      // Submit order to Firestore
      const orderId = await createOrder(orderData);
      
      // Clear cart
      clearCart();
      
      // Show success message
      setSuccessMessage('Order placed successfully!');
      
      // Navigate to confirmation screen with orderId
      setTimeout(() => {
        router.push({
          pathname: '/order-confirmation',
          params: { orderId, totalAmount: total.toFixed(2) }
        });
      }, 1000);
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage('We could not place your order. Please check your internet connection and try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Show loading indicator while placing order
  if (isPlacingOrder) {
    return (
      <ScreenContainer>
        <LoadingIndicator message="Placing your order..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <AppText variant="heading" style={styles.title}>Order Summary</AppText>
      
      <AppText variant="body" style={styles.description}>
        Please review your order before confirming.
      </AppText>
      
      {errorMessage ? (
        <InfoBanner message={errorMessage} type="error" />
      ) : null}
      
      {successMessage ? (
        <InfoBanner message={successMessage} type="success" />
      ) : null}
      
      {isCartEmpty ? (
        <View style={styles.centered}>
          <InfoBanner message="Your cart is empty. Add items before placing an order." type="info" />
          <AppButton
            text="Go to Menu"
            onPress={() => router.push('/')}
            variant="primary"
            fullWidth
            style={styles.button}
          />
        </View>
      ) : (
        <>
          <ScrollView style={styles.itemsContainer}>
            {orderItems.map((item) => (
              <ReadOnlyCartItemRow
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                subtotal={item.price * item.quantity}
              />
            ))}
          </ScrollView>
          
          <PriceSummary
            subtotal={subtotal}
            tax={tax}
            delivery={delivery}
            total={total}
            note="Taxes and delivery fees included"
          />
          
          {/* Customer Details Section */}
          <View style={styles.section}>
            <AppText variant="subheading" style={styles.sectionTitle}>Customer Details</AppText>
            
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>Name (Optional)</AppText>
              <TextInput
                style={styles.input}
                value={customerName}
                onChangeText={setCustomerName}
                placeholder="Enter your name"
                editable={!isPlacingOrder}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>Phone Number (Optional)</AppText>
              <TextInput
                style={styles.input}
                value={customerPhone}
                onChangeText={setCustomerPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                editable={!isPlacingOrder}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>Special Instructions (Optional)</AppText>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Any special requests?"
                multiline
                numberOfLines={3}
                editable={!isPlacingOrder}
              />
            </View>
          </View>
        </>
      )}
      
      {!isCartEmpty && (
        <AppButton
          text={isPlacingOrder ? "Placing Order..." : "Place Order"}
          onPress={handlePlaceOrder}
          variant="primary"
          fullWidth
          style={styles.button}
          disabled={isCartEmpty || isPlacingOrder}
        />
      )}
      
      <AppButton
        text="Back to Cart"
        onPress={() => router.push('/cart')}
        variant="outlined"
        fullWidth
        style={styles.button}
        disabled={isPlacingOrder}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  itemsContainer: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5DED8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 16,
  },
});

export default OrderSummaryScreen;