import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from 'screens/Auth/LogIn';
import SignUp from 'screens/Auth/SignUp';
import Pw from 'screens/Auth/Pw';
import Certification from 'screens/Auth/Certification';
import PwReset from 'screens/Auth/PwReset';
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
        name="Pw"
        component={Pw}
      />
      <Auth.Screen
        options={{ header: () => <BackButton /> }}
        name="Certification"
        component={Certification}
      />
      <Auth.Screen
        options={{ header: () => null }}
        name="PwReset"
        component={PwReset}
      />
    </Auth.Navigator>
  );
};
