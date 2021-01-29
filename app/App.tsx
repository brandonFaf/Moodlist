import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
