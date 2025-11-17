// src/components/CartItemRow.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import AppText from './AppText';
import QuantitySelector from './QuantitySelector';
import spacing from '../theme/spacing';

const CartItemRow = ({
  name,
  price,
  quantity,
  subtotal,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <AppText variant="subheading">{name}</AppText>
          <AppText color="muted">${price.toFixed(2)} each</AppText>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <AppText color="error">Remove</AppText>
          </TouchableOpacity>
          <QuantitySelector
            value={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <AppText variant="body" style={styles.subtotal}>
            ${(subtotal || price * quantity).toFixed(2)}
          </AppText>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  actionContainer: {
    alignItems: 'flex-end',
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xs,
  },
  subtotal: {
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});

export default CartItemRow;