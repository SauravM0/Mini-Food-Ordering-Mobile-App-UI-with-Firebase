// src/components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import AppText from './AppText';
import AppButton from './AppButton';
import InfoBanner from './InfoBanner';
import LoadingIndicator from './LoadingIndicator';
import { subscribeToOrders } from '../services/firestore';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToOrders(
      (ordersData) => {
        setOrders(ordersData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching orders:', error);
        setError('Failed to load order history. Please try again later.');
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // The subscription will automatically retry when we reset the state
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    try {
      // Handle Firestore Timestamp objects
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
      }
      
      // Handle JavaScript Date objects
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString();
      }
      
      // Handle ISO string dates
      if (typeof timestamp === 'string') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
      }
      
      return 'Unknown date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$0.00';
    return `$${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator message="Loading order history..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <InfoBanner 
          message={error} 
          type="error" 
          action={
            <AppButton 
              text="Retry" 
              onPress={handleRetry} 
              variant="outlined" 
              style={styles.retryButton} 
            />
          }
        />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <InfoBanner 
          message="No order history found. Your orders will appear here once you place them." 
          type="info" 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.map((order) => (
        <Card 
          key={order.id} 
          style={styles.orderCard}
        >
          <View style={styles.orderHeader}>
            <AppText variant="subheading">Order #{order.id?.substring(0, 8)}</AppText>
            <AppText variant="body" color="muted">{formatDate(order.createdAt)}</AppText>
          </View>
          
          <View style={styles.orderDetails}>
            <AppText style={styles.itemCount}>
              {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
            </AppText>
            <AppText variant="body" style={styles.totalAmount}>
              Total: {formatCurrency(order.totalAmount)}
            </AppText>
          </View>
          
          <View style={styles.orderStatus}>
            <AppText 
              style={[
                styles.status, 
                order.status === 'pending' && styles.pendingStatus,
                order.status === 'completed' && styles.completedStatus,
                order.status === 'cancelled' && styles.cancelledStatus
              ]}
            >
              {order.status || 'pending'}
            </AppText>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16, // Add padding here instead of the parent container
  },
  orderCard: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemCount: {
    fontWeight: '500',
  },
  totalAmount: {
    fontWeight: '600',
  },
  orderStatus: {
    alignSelf: 'flex-start',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  pendingStatus: {
    backgroundColor: '#FFF9F5',
    color: '#C1440E',
  },
  completedStatus: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
  },
  cancelledStatus: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
  },
  retryButton: {
    marginTop: 8,
  },
});

export default OrderHistory;