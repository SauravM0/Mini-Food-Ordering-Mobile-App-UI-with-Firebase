// src/components/ReadOnlyCartItemRow.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import AppText from './AppText';
import spacing from '../theme/spacing';

const ReadOnlyCartItemRow = ({
  name,
  price,
  quantity,
  subtotal,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <AppText variant="subheading">{name}</AppText>
          <AppText color="muted">${price.toFixed(2)} each</AppText>
        </View>
        <View style={styles.actionContainer}>
          <AppText style={styles.quantity}>×{quantity}</AppText>
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
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  subtotal: {
    fontWeight: '600',
  },
});

export default ReadOnlyCartItemRow;