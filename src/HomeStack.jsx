import React, { useContext, useRef, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from './Center';
import { TouchableOpacity, Text, FlatList, Button } from 'react-native';
import faker from 'faker';

import { AuthContext } from './AuthProvider';
import { addProductRoutes } from './addProductsRoutes';

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

const HomeStack = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Feed">
      {addProductRoutes(Stack)}
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => logout()}
                style={{ paddingRight: 8 }}
              >
                <Text>Log out</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
