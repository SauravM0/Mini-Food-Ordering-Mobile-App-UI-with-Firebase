// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import ErrorBoundary from '../components/ErrorBoundary';
import { CartProvider } from '../context/CartContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <ErrorBoundary>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Menu"
            screenOptions={{
              headerTitleAlign: 'center',
            }}
          >
            <Stack.Screen 
              name="Menu" 
              component={MenuScreen} 
              options={{ title: "Today's Menu" }}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Order Summary' }} />
            <Stack.Screen
              name="OrderConfirmation"
              component={OrderConfirmationScreen}
              options={{ title: 'Order Confirmation' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default AppNavigator;