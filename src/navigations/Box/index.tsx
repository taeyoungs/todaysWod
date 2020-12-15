import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BoxEnroll from 'screens/Box/BoxEnroll';
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
        name="BoxEnroll"
        component={BoxEnroll}
      />
    </Box.Navigator>
  );
};
