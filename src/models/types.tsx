import { StackScreenProps } from '@react-navigation/stack';

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
  Home: undefined;
};

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
