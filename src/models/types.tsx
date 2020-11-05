import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  LogInScreen: undefined;
  SignUp: undefined;
};

export type WelcomeProps = StackScreenProps<RootStackParamList, 'Welcome'>;
export type LogInScreenProps = StackScreenProps<
  RootStackParamList,
  'LogInScreen'
>;
export type SignUpProps = StackScreenProps<RootStackParamList, 'SignUp'>;
