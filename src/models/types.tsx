import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import PersonalInfo from 'screens/Main/PersonalInfo';
import { IScheduleProps, IUserProps } from './common';

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
  Check: { date: string; schedule: IScheduleProps };
  Record: undefined;
  PersonalInfo: undefined;
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
export type CheckScreenProps = StackScreenProps<MainStackParamList, 'Check'>;
export type MemberScreenProps = StackScreenProps<
  MainStackParamList,
  'Membership'
>;

export type ReservationTabScreenProps = BottomTabScreenProps<
  MainTabsParamList,
  'Reservation'
>;
