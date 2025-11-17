// src/screens/MenuScreen.js
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import useMenuItems from '../hooks/useMenuItems';
import { useRouter } from 'expo-router';
import ScreenContainer from '../components/ScreenContainer';
import AppText from '../components/AppText';
import InfoBanner from '../components/InfoBanner';
import FoodCard from '../components/FoodCard';
import AppButton from '../components/AppButton';
import { LoadingIndicator } from '../components';
import { useCart } from '@/src/context/CartContext';

const MenuScreen = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { menuItems, loading, error } = useMenuItems(retryCount);
  const router = useRouter();
  const { addItem, decreaseQuantity, getItemQuantity, totalQuantity } = useCart();

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const handleIncreaseQuantity = (item) => {
    addItem(item);
  };

  const handleDecreaseQuantity = (item) => {
    decreaseQuantity(item.id);
  };

  const handleViewCart = () => {
    router.push('/cart');
  };

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Trigger a retry to refresh data
    setRetryCount(prev => prev + 1);
    // Simulate refresh completion after a short delay
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Show loading indicator if initial load
  if (loading && !refreshing) {
    return (
      <ScreenContainer>
        <LoadingIndicator message="Loading menu..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <AppText variant="heading" style={styles.title}>Today's Menu</AppText>
      <AppText color="muted" style={styles.subtitle}>Choose your favorite dishes</AppText>
      
      {error && (
        <View style={styles.errorContainer}>
          <InfoBanner 
            message={`We couldn't load the menu right now. Please check your internet connection and try again.`} 
            type="error" 
          />
          <AppButton
            text="Retry"
            onPress={handleRetry}
            variant="primary"
            style={styles.retryButton}
          />
        </View>
      )}
      
      {!error && menuItems && menuItems.length > 0 && (
        <>
          <ScrollView 
            style={styles.menuList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {menuItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                onIncrement={handleIncreaseQuantity}
                onDecrement={handleDecreaseQuantity}
                quantity={getItemQuantity(item.id)}
              />
            ))}
          </ScrollView>
          
          <AppButton
            text={`View Cart (${totalQuantity})`}
            onPress={handleViewCart}
            variant="primary"
            fullWidth
            style={styles.cartButton}
            disabled={totalQuantity === 0}
          />
        </>
      )}
      
      {!error && menuItems && menuItems.length === 0 && (
        <View style={styles.centered}>
          <InfoBanner 
            message="No items available at the moment" 
            type="info" 
          />
          <AppButton
            text="Retry"
            onPress={handleRetry}
            variant="primary"
            style={styles.retryButton}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 16,
  },
  menuList: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  retryButton: {
    marginTop: 16,
    width: '50%',
  },
  cartButton: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default MenuScreen;