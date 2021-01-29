import AsyncStorage from '@react-native-async-storage/async-storage';

export default async () => {
  const refresh = await AsyncStorage.getItem('refresh_token');
  const res = await fetch(
    `http://192.168.1.166:5001/auth/refresh_token?token=${refresh}`
  );
  const data = await res.json();
  console.log('data', data);
  await AsyncStorage.setItem('access_token', data.access_token);
  await AsyncStorage.setItem('refresh_token', data.refresh_token);
  const expiresIn = data.expires_in;
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  await AsyncStorage.setItem('expires_at', JSON.stringify(expirationTime));
};
