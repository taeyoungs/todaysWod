import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BoxErollScreen from 'screens/Box/BoxEnrollScreen';
import BoxScreen from 'screens/Box/BoxScreen';
import BackButton from 'components/organisms/BackButton';
import { BoxStackParamList } from 'models/types';

const Box = createStackNavigator<BoxStackParamList>();

export default (): JSX.Element => {
  return (
    <Box.Navigator initialRouteName="BoxScreen" mode="modal">
      <Box.Screen
        options={{ header: () => null }}
        name="BoxScreen"
        component={BoxScreen}
      />
      <Box.Screen
        options={{ header: () => <BackButton /> }}
        name="BoxEnrollScreen"
        component={BoxErollScreen}
      />
    </Box.Navigator>
  );
};
