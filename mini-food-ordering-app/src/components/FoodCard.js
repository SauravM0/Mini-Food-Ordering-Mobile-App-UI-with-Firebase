// src/components/FoodCard.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Card from './Card';
import AppText from './AppText';
import AppButton from './AppButton';
import QuantitySelector from './QuantitySelector';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const FoodCard = ({ item, onAddToCart, onIncrement, onDecrement, quantity = 0 }) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const isAvailable = item.available !== false; // Default to true if not specified
  
  const handleAddToCart = () => {
    if (isAvailable) {
      // Add animation feedback
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      onAddToCart(item);
    }
  };

  const handleIncrement = () => {
    if (isAvailable) {
      onIncrement(item);
    }
  };

  const handleDecrement = () => {
    if (isAvailable) {
      onDecrement(item);
    }
  };

  return (
    <Card style={[styles.card, !isAvailable && styles.unavailableCard]}>
      <View style={styles.content}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholderImage]} />
        )}
        <View style={styles.textContainer}>
          <AppText variant="subheading">{item.name}</AppText>
          <AppText color="muted" style={styles.description}>
            {item.description}
          </AppText>
          <AppText variant="body" style={styles.price}>
            ${item.price.toFixed(2)}
          </AppText>
          {!isAvailable && (
            <AppText color="danger" style={styles.unavailableText}>
              Out of stock
            </AppText>
          )}
        </View>
      </View>
      <Animated.View style={[styles.actionContainer, { transform: [{ scale: scaleValue }] }]}>
        {quantity > 0 ? (
          <QuantitySelector
            value={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            disabled={!isAvailable}
          />
        ) : (
          <AppButton
            text="Add to Cart"
            onPress={handleAddToCart}
            variant="primary"
            fullWidth
            disabled={!isAvailable}
          />
        )}
      </Animated.View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  unavailableCard: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  placeholderImage: {
    backgroundColor: colors.border,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginVertical: spacing.xs,
  },
  price: {
    fontWeight: '600',
  },
  unavailableText: {
    fontSize: 12,
    marginTop: 4,
  },
  actionContainer: {
    marginTop: spacing.md,
  },
});

export default FoodCard;