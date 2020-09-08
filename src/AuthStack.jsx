import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

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

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
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
  );
};

export default AuthStack;
