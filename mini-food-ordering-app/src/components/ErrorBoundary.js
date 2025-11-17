// src/components/ErrorBoundary.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppText from './AppText';
import ScreenContainer from './ScreenContainer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    // Reset error state to retry
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ScreenContainer>
          <View style={styles.container}>
            <AppText variant="heading" style={styles.title}>Oops, something went wrong!</AppText>
            <AppText style={styles.message}>
              We're sorry, but it seems there was an unexpected error.
            </AppText>
            
            <Button title="Try Again" onPress={this.handleRetry} />
            
            {__DEV__ && (
              <View style={styles.errorDetails}>
                <AppText style={styles.errorTitle}>Error Details:</AppText>
                <Text style={styles.errorText}>{this.state.error && this.state.error.toString()}</Text>
              </View>
            )}
          </View>
        </ScreenContainer>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
  },
  errorDetails: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: '100%',
  },
  errorTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#d32f2f',
  },
});

export default ErrorBoundary;