import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Button, ActivityIndicator, AsyncStorage } from 'react-native';

import { Center } from './Center';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  return (
    <Center>
      <Text>Login screen</Text>
      <Button title="Log me in" onPress={() => login()} />
      <Button
        title="Go to register"
        onPress={() => navigation.navigate('Register')}
      />
    </Center>
  );
};

const Register = ({ navigation }) => {
  return (
    <Center>
      <Text>Signup screen</Text>
      <Button
        title="Go to login"
        onPress={() => navigation.navigate('Login')}
      />
    </Center>
  );
};

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
      {user ? (
        <Center>
          <Text>User exist</Text>
        </Center>
      ) : (
        <Stack.Navigator
          // screenOptions={{ header: () => null }}
          initialRouteName="Login"
        >
          <Stack.Screen
            options={{ headerTitle: 'Sign In' }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerTitle: 'Sign Up' }}
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
