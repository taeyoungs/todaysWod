import React, { useState } from 'react';
import LogIn from 'components/templates/Auth/LogIn';
import { GestureResponderEvent } from 'react-native';
import { LogInScreenProps } from 'models/types';
import { createOneButtonAlert, validateEmail } from 'utils';
import api from 'api/index';

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const LogInScreen: React.FC<IProps> = ({ navigation }) => {
  const [email, setEmail] = useState('lolollg@naver.com');
  const [pw, setPw] = useState('xodud9411!');
  const onPwChange = (text: string) => setPw(text);
  const onPress = async (event: GestureResponderEvent) => {
    // console.log(email, pw);
    if (!validateEmail(email)) {
      createOneButtonAlert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    try {
      const form = {
        username: email,
        password: pw,
      };
      // const results = await api.token(form);
      // console.log(results);
    } catch (error) {
      console.log(error);
    }
  };
  const goSignUp = () => navigation.navigate('SignUpScreen');
  const goPwChange = () => navigation.navigate('PwScreen');
  return (
    <LogIn
      email={email}
      setEmail={setEmail}
      pw={pw}
      onPwChange={onPwChange}
      onPress={onPress}
      goSignUp={goSignUp}
      goPwChange={goPwChange}
    />
  );
};

export default LogInScreen;
