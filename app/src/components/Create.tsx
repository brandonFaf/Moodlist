import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProps } from '../types/navigation';

const Create: React.FC<NavigationProps<'Create'>> = ({ navigation }) => {
  return (
    <View>
      <Text>Create</Text>
      <Button onPress={() => navigation.navigate('Mood')} title='Go to Mood' />
    </View>
  );
};

export default Create;
