// src/screens/OrderConfirmationScreen.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import InfoBanner from '../components/InfoBanner';
import { useRouter, useLocalSearchParams } from 'expo-router';

const OrderConfirmationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { orderId, totalAmount } = params;

  return (
    <ScreenContainer>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.checkmarkCircle}>
            <AppText style={styles.checkmark}>✓</AppText>
          </View>
        </View>
        
        <AppText variant="heading" style={styles.title}>Order Placed Successfully!</AppText>
        
        <InfoBanner 
          message="Thank you for your order. Your delicious meal is being prepared!" 
          type="success" 
        />
        
        {orderId ? (
          <View style={styles.detailContainer}>
            <AppText variant="body" style={styles.detailLabel}>Order ID:</AppText>
            <AppText variant="subheading" style={styles.detailValue}>#{orderId}</AppText>
          </View>
        ) : null}
        
        {totalAmount ? (
          <View style={styles.detailContainer}>
            <AppText variant="body" style={styles.detailLabel}>Total Amount:</AppText>
            <AppText variant="subheading" style={styles.detailValue}>${totalAmount}</AppText>
          </View>
        ) : null}
        
        <View style={styles.detailContainer}>
          <AppText variant="body" style={styles.detailLabel}>Estimated Delivery:</AppText>
          <AppText variant="subheading" style={styles.detailValue}>30-45 minutes</AppText>
        </View>
        
        <View style={styles.spacer} />
        
        <AppButton
          text="Back to Menu"
          onPress={() => router.push('/')}
          variant="primary"
          fullWidth
          style={styles.button}
        />
        
        <AppButton
          text="Order Again"
          onPress={() => router.push('/')}
          variant="outlined"
          fullWidth
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginBottom: 24,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5DED8',
  },
  detailLabel: {
    fontSize: 16,
    color: '#8B7365',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  spacer: {
    height: 24,
  },
  button: {
    marginTop: 16,
    width: '100%',
    maxWidth: 300,
  },
});

export default OrderConfirmationScreen;