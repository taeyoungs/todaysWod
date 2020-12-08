import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import SignUp from 'components/templates/Auth/SignUp';
import { LogInScreenProps } from 'models/types';
import api from 'api';
import { createOneButtonAlert } from 'utils';

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const SignUpScreen: React.FC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const onEmailChange = (text: string) => setEmail(text);
  const onPwChange = (text: string) => setPw(text);
  const onConfirmPwChange = (text: string) => setConfirmPw(text);
  const onPress = async (event: GestureResponderEvent) => {
    try {
      setLoading(true);
      const form = {
        username: email,
        email,
        password: pw,
      };
      await api.signUp(form);
      // console.log(results.status);
      navigation.navigate('LogInScreen');
    } catch (error) {
      console.warn(error);
      if (error.message === 'Request failed with status code 409') {
        createOneButtonAlert('이미 존재하는 아이디(이메일)입니다.');
      }
    } finally {
      setLoading(false);
    }
  };
  const clearEmail = () => setEmail('');
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
      loading={loading}
      clearEmail={clearEmail}
    />
  );
};

export default SignUpScreen;
