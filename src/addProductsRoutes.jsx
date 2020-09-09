import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Text, Button } from 'react-native';

import { Center } from './Center';

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

export const addProductRoutes = (Stack) => {
  return (
    <>
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
    </>
  );
};
