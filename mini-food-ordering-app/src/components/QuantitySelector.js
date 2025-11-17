// src/components/QuantitySelector.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import AppText from './AppText';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import borderRadius from '../theme/borderRadius';

const QuantitySelector = ({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 99,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <AppButton
        text="-"
        onPress={onDecrement}
        variant="outlined"
        style={styles.button}
        disabled={disabled || value <= min}
      />
      <View style={styles.valueContainer}>
        <AppText variant="body" style={styles.value}>
          {value}
        </AppText>
      </View>
      <AppButton
        text="+"
        onPress={onIncrement}
        variant="outlined"
        style={styles.button}
        disabled={disabled || value >= max}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 40,
    paddingHorizontal: spacing.sm,
  },
  valueContainer: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  value: {
    fontWeight: '600',
  },
});

export default QuantitySelector;