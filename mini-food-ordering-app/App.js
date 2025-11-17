// App.js
import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

// Ignore specific warning messages that are not critical
LogBox.ignoreLogs([
  'Cannot record touch end without a touch start',
  'VirtualizedLists should never be nested',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}

AppRegistry.registerComponent('main', () => App);