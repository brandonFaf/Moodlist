import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProps } from '../types/navigation';

const Mood: React.FC<NavigationProps<'Mood'>> = ({ navigation }) => {
  return (
    <View>
      <Text>Mood</Text>
      <Button onPress={() => navigation.navigate('List')} title='Go to List' />
    </View>
  );
};

export default Mood;
