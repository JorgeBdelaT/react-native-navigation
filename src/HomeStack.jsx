// 58:04

import React, { useContext, useRef, useState, useEffect } from 'react';
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

const Product = ({ route, navigation }) => {
  return (
    <Center>
      <Button
        title={`Edit ${route.params.name}`}
        onPress={() =>
          navigation.navigate('EditProduct', { name: route.params.name })
        }
      />
    </Center>
  );
};

const apiCall = (x) => {
  console.log('form submitted');
  return x;
};

const EditProduct = ({ route, navigation }) => {
  const [formState] = useState();
  const submit = useRef();

  submit.current = () => {
    // api call with new form state
    apiCall(formState);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text> Editing {route.params.name}</Text>
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
      <Stack.Screen
        name="Product"
        component={Product}
        options={({ route }) => {
          return {
            headerTitle: `Product: ${route.params.name}`,
          };
        }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={({ route }) => {
          return {
            headerTitle: `Edit ${route.params.name}`,
            headerRight: () => (
              <TouchableOpacity
                style={{ paddingRight: 8 }}
                onPress={() => {
                  // submit form
                  route.params.submit.current();
                }}
              >
                <Text style={{ color: 'red' }}>Done</Text>
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
