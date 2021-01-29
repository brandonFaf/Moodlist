import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Playlist } from './types/Playlist';
const Home = () => {
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
