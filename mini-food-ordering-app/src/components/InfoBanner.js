// src/components/InfoBanner.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import AppText from './AppText';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import borderRadius from '../theme/borderRadius';

const InfoBanner = ({ message, type = 'info', style }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success + '20'; // 20 = 12.5% opacity
      case 'error':
        return colors.danger + '20';
      case 'warning':
        return '#FFC107' + '20'; // Amber for warning
      default:
        return colors.primary + '20';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.danger;
      case 'warning':
        return '#FFC107';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.danger;
      case 'warning':
        return '#FFC107';
      default:
        return colors.primary;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '!';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <Card style={[styles.card, { 
      backgroundColor: getBackgroundColor(),
      borderLeftWidth: 4,
      borderLeftColor: getBorderColor(),
    }, style]}>
      <View style={styles.content}>
        <AppText style={[styles.icon, { color: getTextColor() }]}>
          {getIcon()}
        </AppText>
        <AppText color={type} style={styles.message}>
          {message}
        </AppText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.light,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: spacing.md,
  },
  message: {
    flex: 1,
    textAlign: 'left',
  },
});

export default InfoBanner;