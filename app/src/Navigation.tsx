import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshTokens from './helpers/refreshTokens';
import Create from './components/Create';
import List from './components/List';
import Mood from './components/Mood';
const MainStack = createStackNavigator();
const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const tokenExpirationTime = await AsyncStorage.getItem('expires_at');
      if (!tokenExpirationTime) {
        setIsLoggedIn(false);
        return;
      }
      if (new Date().getTime() > parseInt(tokenExpirationTime)) {
        await refreshTokens();
      }
      setIsLoggedIn(true);
    };
    checkLoggedIn();
  });
  return (
    <MainStack.Navigator>
      {isLoggedIn ? (
        <>
          <MainStack.Screen name='Home' component={Home} />
          <MainStack.Screen name='Create' component={Create} />
          <MainStack.Screen name='Mood' component={Mood} />
          <MainStack.Screen name='List' component={List} />
        </>
      ) : (
        <MainStack.Screen name='Login' component={Login} />
      )}
    </MainStack.Navigator>
  );
};

export default Navigation;
