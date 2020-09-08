import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, AsyncStorage } from 'react-native';

import { Center } from './Center';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';
import AuthStack from './AuthStack';

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    // Check if user is logged in
    AsyncStorage.getItem('user')
      .then((userString) => {
        if (userString) {
          // decode it
          login();
        }

        setLoading(false);
        console.log(userString);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
