// src/components/AppButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import borderRadius from '../theme/borderRadius';
import spacing from '../theme/spacing';

const AppButton = ({
  text,
  onPress,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return colors.secondary;
      case 'outlined':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (variant === 'outlined') {
      return disabled ? colors.mutedText : colors.primary;
    }
    return colors.surface;
  };

  const getBorderColor = () => {
    if (variant === 'outlined') {
      return disabled ? colors.border : colors.primary;
    }
    return 'transparent';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outlined' ? 1 : 0,
          opacity: disabled ? 0.6 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.standard,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Minimum touch target size
  },
  text: {
    fontSize: typography.body,
    fontWeight: '600',
  },
});

export default AppButton;