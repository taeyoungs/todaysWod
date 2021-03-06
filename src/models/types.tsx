import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { IScheduleProps } from './common';

export type AuthStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  Pw: undefined;
  Certification: { email: string };
  PwReset: { email: string };
  BoxScreen: undefined;
  BoxEnroll: undefined;
};

export type BoxStackParamList = {
  BoxScreen: undefined;
  BoxEnroll: undefined;
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

export type LogInScreenProps = StackScreenProps<AuthStackParamList, 'LogIn'>;
export type SignUpScreenProps = StackScreenProps<AuthStackParamList, 'SignUp'>;
export type PwScreenProps = StackScreenProps<AuthStackParamList, 'Pw'>;
export type CertificationScreenProps = StackScreenProps<
  AuthStackParamList,
  'Certification'
>;
export type PwResetScreenProps = StackScreenProps<
  AuthStackParamList,
  'PwReset'
>;
export type BoxScreenProps = StackScreenProps<BoxStackParamList, 'BoxScreen'>;
export type BoxEnrollScreenProps = StackScreenProps<
  BoxStackParamList,
  'BoxEnroll'
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
