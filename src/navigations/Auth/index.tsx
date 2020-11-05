import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'models/types';
import LogInScreen from 'screens/LogInScreen';

const Auth = createStackNavigator<RootStackParamList>();

export default (): JSX.Element => {
  return (
    <Auth.Navigator initialRouteName="LogInScreen">
      <Auth.Screen
        options={{ header: () => null }}
        name="LogInScreen"
        component={LogInScreen}
      />
    </Auth.Navigator>
  );
};
