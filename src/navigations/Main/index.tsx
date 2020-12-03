import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Icon from 'components/atoms/Icon';
import T, { FontFamily } from 'components/atoms/T';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import Block from 'components/molecules/Block';
import BackButton from 'components/organisms/BackButton';
import Reservation from 'screens/Main/Reservation';
import Alerts from 'screens/Main/Alerts';
import Profile from 'screens/Main/Profile';
import Home from 'screens/Main/Home';
import Membership from 'screens/Main/Membership';
import Schedule from 'screens/Main/Schedule';
import Wod from 'screens/Main/Wod';
import Check from 'screens/Main/Check';
import { ColorPalette } from 'models/color';
import { MainStackParamList, MainTabsParamList } from 'models/types';
import useAlert from 'hooks/useAlert';
import Record from 'screens/Main/Record';

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Main = createStackNavigator<MainStackParamList>();

const Tabs = () => {
  const { hasNewAlert } = useAlert();
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { borderTopColor: ColorPalette.Main.BG_DARK },
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let name = '';
          if (route.name === 'Home') {
            name = '와드';
          } else if (route.name === 'Reservation') {
            name = '예약';
          } else if (route.name === 'Alerts') {
            name = '알림';
          } else {
            name = '프로필';
          }
          const color = focused
            ? ColorPalette.Main.BG
            : ColorPalette.Gray.SILVER;
          const family = focused
            ? FontFamily.NANUM_BOLD
            : FontFamily.NANUM_REGULAR;
          return (
            <T
              color={color}
              size={10}
              margin={[-5, 0, 5, 0]}
              fontFamily={family}
            >
              {name}
            </T>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'list';
            size = 22;
          } else if (route.name === 'Reservation') {
            iconName = 'calendar';
            size = 20;
          } else if (route.name === 'Alerts') {
            iconName = 'notifications-outline';
            size = 20;
          } else {
            iconName = 'contact';
            size = 20;
          }
          color = focused ? ColorPalette.Main.BG : ColorPalette.Gray.SILVER;

          return (
            <View>
              <Icon name={iconName} size={size} color={color} />
              {route.name === 'Alerts' && hasNewAlert && (
                <PositionBlock position={Position.ABSOLUTE} top={0} right={-5}>
                  <Block
                    padding={[4]}
                    borderRadius={[100]}
                    backgroundColor={ColorPalette.Main.TXT}
                  ></Block>
                </PositionBlock>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen component={Home} name="Home" />
      <Tab.Screen component={Reservation} name="Reservation" />
      <Tab.Screen component={Alerts} name="Alerts" />
      <Tab.Screen component={Profile} name="Profile" />
    </Tab.Navigator>
  );
};

export default (): JSX.Element => {
  return (
    <Main.Navigator
      mode="modal"
      headerMode="float"
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackground: () => null,
        headerTitle: () => null,
      }}
    >
      <Main.Screen
        component={Tabs}
        name="Tabs"
        options={{ header: () => null }}
      />
      <Main.Screen
        component={Membership}
        name="Membership"
        options={{ header: () => <BackButton /> }}
      />
      <Main.Screen
        component={Schedule}
        name="Schedule"
        options={{ header: () => null }}
      />
      <Main.Screen
        component={Wod}
        name="Wod"
        options={{ header: () => null }}
      />
      <Main.Screen
        component={Check}
        name="Check"
        options={{ header: () => null }}
      />
      <Main.Screen
        component={Record}
        name="Record"
        options={{
          ...TransitionPresets.DefaultTransition,
        }}
      />
    </Main.Navigator>
  );
};
