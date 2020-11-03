import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type WelcomeProps = StackScreenProps<RootStackParamList, 'Welcome'>;
export type SignInProps = StackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpProps = StackScreenProps<RootStackParamList, 'SignUp'>;
