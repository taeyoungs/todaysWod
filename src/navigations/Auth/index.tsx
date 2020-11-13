import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from 'screens/Auth/LogInScreen';
import SignUpScreen from 'screens/Auth/SignUpScreen';
import PwScreen from 'screens/Auth/PwScreen';
import CertificationScreen from 'screens/Auth/CertificationScreen';
import PwResetScreen from 'screens/Auth/PwResetScreen';
import BackButton from 'components/organisms/BackButton';
import { AuthStackParamList } from 'models/types';

const Auth = createStackNavigator<AuthStackParamList>();

export default (): JSX.Element => {
  return (
    <Auth.Navigator initialRouteName="LogInScreen" mode="modal">
      <Auth.Screen
        options={{ header: () => null }}
        name="LogInScreen"
        component={LogInScreen}
      />
      <Auth.Screen
        options={{ header: () => <BackButton /> }}
        name="SignUpScreen"
        component={SignUpScreen}
      />
      <Auth.Screen
        options={{ header: () => <BackButton /> }}
        name="PwScreen"
        component={PwScreen}
      />
      <Auth.Screen
        options={{ header: () => <BackButton /> }}
        name="CertificationScreen"
        component={CertificationScreen}
      />
      <Auth.Screen
        options={{ header: () => null }}
        name="PwResetScreen"
        component={PwResetScreen}
      />
    </Auth.Navigator>
  );
};
