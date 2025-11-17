// src/components/Card.js
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import colors from '../theme/colors';
import borderRadius from '../theme/borderRadius';
import shadows from '../theme/shadows';
import spacing from '../theme/spacing';

const Card = ({ children, padding = spacing.md, onPress, style }) => {
  const ContainerComponent = onPress ? TouchableOpacity : View;
  
  return (
    <ContainerComponent
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          padding: padding,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {children}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.standard,
    ...shadows.card,
    marginBottom: spacing.md,
  },
});

export default Card;