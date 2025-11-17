import React from 'react';
import OrderSummaryScreen from '@/src/screens/OrderSummaryScreen';
import { useNavigation } from 'expo-router';

export default function OrderSummary() {
  const navigation = useNavigation();
  
  return <OrderSummaryScreen navigation={navigation} />;
}