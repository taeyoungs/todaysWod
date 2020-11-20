import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export type AuthStackParamList = {
  LogInScreen: undefined;
  SignUpScreen: undefined;
  PwScreen: undefined;
  CertificationScreen: { email: string };
  PwResetScreen: { email: string };
  BoxScreen: undefined;
  BoxEnrollScreen: undefined;
};

export type BoxStackParamList = {
  BoxScreen: undefined;
  BoxEnrollScreen: undefined;
};

export type MainStackParamList = {
  Tabs: undefined;
  Membership: undefined;
  Schedule: { date: string };
  Wod: { date: string };
};

export type MainTabsParamList = {
  Home: undefined;
  Reservation: undefined;
  Alerts: undefined;
  Profile: undefined;
};

export type CombineNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList>,
  StackNavigationProp<MainStackParamList>
>;

export type LogInScreenProps = StackScreenProps<
  AuthStackParamList,
  'LogInScreen'
>;
export type SignUpScreenProps = StackScreenProps<
  AuthStackParamList,
  'SignUpScreen'
>;
export type PwScreenProps = StackScreenProps<AuthStackParamList, 'PwScreen'>;
export type CertificationScreenProps = StackScreenProps<
  AuthStackParamList,
  'CertificationScreen'
>;
export type PwResetScreenProps = StackScreenProps<
  AuthStackParamList,
  'PwResetScreen'
>;
export type BoxScreenProps = StackScreenProps<BoxStackParamList, 'BoxScreen'>;
export type BoxEnrollScreenProps = StackScreenProps<
  BoxStackParamList,
  'BoxEnrollScreen'
>;

export type HomeScreenProps = StackScreenProps<MainStackParamList>;

export type ScheduleScreenProps = StackScreenProps<
  MainStackParamList,
  'Schedule'
>;

export type WodScreenProps = StackScreenProps<MainStackParamList, 'Wod'>;
