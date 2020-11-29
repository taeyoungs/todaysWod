import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import SignUp from 'components/templates/Auth/SignUp';
import { LogInScreenProps } from 'models/types';
import api from 'api';

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
        gender: '남',
      };
      const results = await api.signUp(form);
      console.log(results.status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.navigate('LogInScreen');
    }
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
      loading={loading}
    />
  );
};

export default SignUpScreen;
