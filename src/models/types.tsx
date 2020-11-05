import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
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
