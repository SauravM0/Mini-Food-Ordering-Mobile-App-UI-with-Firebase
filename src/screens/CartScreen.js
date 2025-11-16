// src/screens/CartScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Text>This screen will show selected items with quantities and total.</Text>

      <Button
        title="Go to Order Summary"
        onPress={() => navigation.navigate('OrderSummary')}
      />
      <Button
        title="Back to Menu"
        onPress={() => navigation.navigate('Menu')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
});

export default CartScreen;