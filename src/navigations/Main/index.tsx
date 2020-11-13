import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from 'models/types';
import React from 'react';
import Home from 'screens/Main/Home';

// const Tabs = createBottomTabNavigator
const Main = createStackNavigator<MainStackParamList>();

export default () => {
  return (
    <Main.Navigator>
      <Main.Screen component={Home} name="Home" />
    </Main.Navigator>
  );
};
