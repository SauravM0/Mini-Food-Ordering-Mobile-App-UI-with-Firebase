// src/components/ScreenContainer.js
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const ScreenContainer = ({ 
  children, 
  scrollable = false, 
  backgroundColor = colors.background,
  style 
}) => {
  const ContainerComponent = scrollable ? ScrollView : View;
  
  return (
    <ContainerComponent
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
      contentContainerStyle={scrollable ? styles.contentContainer : null}
    >
      <View style={styles.innerContainer}>
        {children}
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
});

export default ScreenContainer;