// src/components/AppText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

const AppText = ({
  children,
  variant = 'body',
  color = 'default',
  align = 'left',
  style,
}) => {
  const getColor = () => {
    switch (color) {
      case 'muted':
        return colors.mutedText;
      case 'success':
        return colors.success;
      case 'error':
        return colors.danger;
      default:
        return colors.text;
    }
  };

  const getFontSize = () => {
    switch (variant) {
      case 'heading':
        return typography.heading;
      case 'subheading':
        return typography.subheading;
      case 'small':
        return typography.small;
      default:
        return typography.body;
    }
  };

  const getFontWeight = () => {
    switch (variant) {
      case 'heading':
        return 'bold';
      case 'subheading':
        return '600';
      default:
        return 'normal';
    }
  };

  return (
    <Text
      style={[
        styles.text,
        {
          color: getColor(),
          fontSize: getFontSize(),
          fontWeight: getFontWeight(),
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 20, // Improves readability
  },
});

export default AppText;