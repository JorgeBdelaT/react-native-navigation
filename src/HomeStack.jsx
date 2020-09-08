// 58:04

import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from './Center';
import { TouchableOpacity, Text, FlatList, Button } from 'react-native';
import faker from 'faker';

import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();

const Feed = ({ navigation }) => {
  return (
    <Center>
      <FlatList
        style={{ width: '100%' }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate('Product', { name: item });
              }}
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
};

const Product = ({ route }) => {
  return (
    <Center>
      <Text> {route.params.name}</Text>
    </Center>
  );
};

const HomeStack = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => logout()}>
                <Text>Log out</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({ route }) => {
          return {
            headerTitle: `Product: ${route.params.name}`,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
