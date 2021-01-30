import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationProps } from './types/navigation';
import { Playlist } from './types/Playlist';
const Home: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {
  const [data, setData] = useState<Playlist[]>([]);
  useEffect(() => {
    const getPlaylists = async () => {
      const token = await AsyncStorage.getItem('access_token');
      const res = await fetch(
        'https://api.spotify.com/v1/users/brobby1010/playlists',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setData(data.items);
    };
    getPlaylists();
  });
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Create')} title='Create' />
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Home;
