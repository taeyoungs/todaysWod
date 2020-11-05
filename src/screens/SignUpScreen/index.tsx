import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import SignUp from 'components/templates/SignUp';
import { LogInScreenProps } from 'models/types';

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const SignUpScreen: React.FC<IProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const onEmailChange = (text: string) => setEmail(text);
  const onPwChange = (text: string) => setPw(text);
  const onConfirmPwChange = (text: string) => setConfirmPw(text);
  const onPress = (event: GestureResponderEvent) => {
    console.log(email, pw, confirmPw);
  };
  const goLogIn = () => navigation.navigate('LogInScreen');
  return (
    <SignUp
      email={email}
      pw={pw}
      confirmPw={confirmPw}
      onPwChange={onPwChange}
      onConfirmPwChange={onConfirmPwChange}
      onEmailChange={onEmailChange}
      onPress={onPress}
      goLogIn={goLogIn}
    />
  );
};

export default SignUpScreen;
