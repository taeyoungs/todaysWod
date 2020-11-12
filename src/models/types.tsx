import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
  PwScreen: undefined;
  CertificationScreen: { email: string };
  PwResetScreen: { email: string };
  BoxScreen: undefined;
  BoxEnrollScreen: undefined;
};

export type WelcomeProps = StackScreenProps<RootStackParamList, 'Welcome'>;
export type LogInScreenProps = StackScreenProps<
  RootStackParamList,
  'LogInScreen'
>;
export type SignUpScreenProps = StackScreenProps<
  RootStackParamList,
  'SignUpScreen'
>;
export type PwScreenProps = StackScreenProps<RootStackParamList, 'PwScreen'>;
export type CertificationScreenProps = StackScreenProps<
  RootStackParamList,
  'CertificationScreen'
>;
export type PwResetScreenProps = StackScreenProps<
  RootStackParamList,
  'PwResetScreen'
>;
export type BoxScreenProps = StackScreenProps<RootStackParamList, 'BoxScreen'>;
