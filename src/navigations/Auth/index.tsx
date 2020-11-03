import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from 'screens/Welcome';
import { RootStackParamList } from 'models/types';

const Auth = createStackNavigator<RootStackParamList>();

export default (): JSX.Element => {
  return (
    <Auth.Navigator initialRouteName="Welcome">
      <Auth.Screen name="Welcome" component={Welcome} />
    </Auth.Navigator>
  );
};
