import React from 'react';
import CartScreen from '@/src/screens/CartScreen';
import { useNavigation } from 'expo-router';

export default function Cart() {
  const navigation = useNavigation();
  
  return <CartScreen navigation={navigation} />;
}