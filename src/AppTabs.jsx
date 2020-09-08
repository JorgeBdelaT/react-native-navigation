import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, EvilIcons } from '@expo/vector-icons';

import { Center } from './Center';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack';

const Tabs = createBottomTabNavigator();

const Search = () => {
  return (
    <Center>
      <Text>search</Text>
    </Center>
  );
};

export const AppTabs = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <AntDesign name={'home'} size={size} color={color} />;
          } else if (route.name === 'Search') {
            return <EvilIcons name={'search'} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'dodgerblue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Search" component={Search} />
    </Tabs.Navigator>
  );
};
