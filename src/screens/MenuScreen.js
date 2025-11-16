// src/screens/MenuScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.subtitle}>This will show the list of food items.</Text>

      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart')}
      />
      <Button
        title="Go to Order Summary"
        onPress={() => navigation.navigate('OrderSummary')}
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
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
});

export default MenuScreen;