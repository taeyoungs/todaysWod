import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from 'screens/Auth/LogIn';
import SignUp from 'screens/Auth/SignUp';
import PwScreen from 'screens/Auth/PwScreen';
import CertificationScreen from 'screens/Auth/CertificationScreen';
import PwResetScreen from 'screens/Auth/PwResetScreen';
import BackButton from 'components/organisms/BackButton';
import { AuthStackParamList } from 'models/types';

const Auth = createStackNavigator<AuthStackParamList>();

export default (): JSX.Element => {
  return (
    <Auth.Navigator initialRouteName="LogIn" mode="modal">
      <Auth.Screen
        options={{ header: () => null }}
        name="LogIn"
        component={LogIn}
      />
      <Auth.Screen
        options={{ header: () => null }}
        name="SignUp"
        component={SignUp}
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
