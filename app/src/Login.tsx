import { openAuthSessionAsync } from 'expo-web-browser';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthParams } from './helpers/URLparser';

export default () => {
  const [result, setResult] = useState<string>('test');
  const [data, setData] = useState<string>();
  console.log('yayayayayay', makeRedirectUri());

  const _handlePressButtonAsync = async () => {
    let res = await openAuthSessionAsync(
      'http://192.168.1.166:5001/auth/login',
      makeRedirectUri()
    );
    if (res.type == 'success') {
      const params: AuthParams = getAuthParams(res.url);
      setResult(params.access_token);
      await AsyncStorage.setItem('access_token', params.access_token);
      await AsyncStorage.setItem('refresh_token', params.refresh_token);
      const expiresIn = params.expires_in;
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await AsyncStorage.setItem('expires_at', JSON.stringify(expirationTime));
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App to start working on your app!</Text>
      <Text>{makeRedirectUri()}</Text>
      <Text>{result}</Text>
      <Text>{data}</Text>
      <Button title='Login' onPress={_handlePressButtonAsync} />
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
