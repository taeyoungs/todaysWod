import React, { useState } from 'react';
import LogIn from 'components/templates/LogIn';
import { GestureResponderEvent } from 'react-native';
import { LogInScreenProps } from 'models/types';
import { createTwoButtonAlert, validateEmail } from 'utils';

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const LogInScreen: React.FC<IProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const onEmailChange = (text: string) => setEmail(text);
  const onPwChange = (text: string) => setPw(text);
  const onPress = (event: GestureResponderEvent) => {
    // console.log(email, pw);
    if (!validateEmail(email, pw)) {
      createTwoButtonAlert();
      return;
    }
  };
  const goSignUp = () => navigation.navigate('SignUpScreen');
  return (
    <LogIn
      email={email}
      onEmailChange={onEmailChange}
      pw={pw}
      onPwChange={onPwChange}
      onPress={onPress}
      goSignUp={goSignUp}
    />
  );
};

export default LogInScreen;
