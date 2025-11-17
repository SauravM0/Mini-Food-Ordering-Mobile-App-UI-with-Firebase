// src/components/LoadingIndicator.js
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AppText from './AppText';
import Card from './Card';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const LoadingIndicator = ({ message = 'Loading...', size = 'large', style }) => {
  return (
    <View style={[styles.container, style]}>
      <Card style={styles.card}>
        <ActivityIndicator 
          size={size} 
          color={colors.primary} 
          style={styles.spinner}
        />
        {message ? (
          <AppText style={styles.message}>{message}</AppText>
        ) : null}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: spacing.lg,
    alignItems: 'center',
    minWidth: 200,
  },
  spinner: {
    marginBottom: spacing.md,
  },
  message: {
    textAlign: 'center',
  },
});

export default LoadingIndicator;