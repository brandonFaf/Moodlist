import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProps } from '../types/navigation';

const List: React.FC<NavigationProps<'List'>> = ({ navigation }) => {
  return (
    <View>
      <Text>List</Text>
      <Button onPress={() => navigation.navigate('Home')} title='Go Home' />
    </View>
  );
};

export default List;
