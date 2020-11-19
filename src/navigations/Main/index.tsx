import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'components/atoms/Icon';
import BackButton from 'components/organisms/BackButton';
import Reservation from 'screens/Main/Reservation';
import Alerts from 'screens/Main/Alerts';
import Profile from 'screens/Main/Profile';
import Home from 'screens/Main/Home';
import Membership from 'screens/Main/Membership';
import { ColorPalette } from 'models/color';
import { MainStackParamList, MainTabsParamList } from 'models/types';

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Main = createStackNavigator<MainStackParamList>();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { borderTopColor: ColorPalette.Main.BG_DARK },
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          // if (route.name === 'Home' && focused) {
          //   return <T color={ColorPalette.Main.BG}>홈</T>;
          // } else if (route.name === 'Reservation' && focused) {
          //   return <T>와드</T>;
          // } else if (route.name === 'Alerts' && focused) {
          //   return <T>알림</T>;
          // } else if (route.name === 'Profile' && focused) {
          //   return <T>프로필</T>;
          // } else {
          //   return null;
          // }
          return null;
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
            iconName = 'notifications';
            size = 20;
          } else {
            iconName = 'contact';
            size = 20;
          }
          color = focused ? ColorPalette.Main.BG : ColorPalette.Gray.SILVER;

          return <Icon name={iconName} size={size} color={color} />;
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
    <Main.Navigator mode="modal">
      <Main.Screen
        component={Tabs}
        name="Tabs"
        options={{ header: () => null }}
      />
      <Main.Screen
        component={Membership}
        name="Membership"
        options={{ header: () => <BackButton isWhite={true} /> }}
      />
    </Main.Navigator>
  );
};
