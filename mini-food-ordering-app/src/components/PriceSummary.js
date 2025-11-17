// src/components/PriceSummary.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import AppText from './AppText';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const PriceSummary = ({ subtotal, tax, delivery, total, note }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <AppText color="muted">Subtotal</AppText>
        <AppText>${subtotal?.toFixed(2) || '0.00'}</AppText>
      </View>
      
      {tax > 0 && (
        <View style={styles.row}>
          <AppText color="muted">Tax</AppText>
          <AppText>${tax.toFixed(2)}</AppText>
        </View>
      )}
      
      {delivery > 0 && (
        <View style={styles.row}>
          <AppText color="muted">Delivery</AppText>
          <AppText>${delivery.toFixed(2)}</AppText>
        </View>
      )}
      
      <View style={[styles.row, styles.totalRow]}>
        <AppText variant="subheading">Total</AppText>
        <AppText variant="subheading" style={styles.totalAmount}>
          ${total?.toFixed(2) || '0.00'}
        </AppText>
      </View>
      
      {note && (
        <AppText color="muted" style={styles.note}>
          {note}
        </AppText>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
    paddingTop: spacing.md,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  note: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default PriceSummary;