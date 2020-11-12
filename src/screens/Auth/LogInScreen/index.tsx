import React, { useState } from 'react';
import LogIn from 'components/templates/Auth/LogIn';
import { GestureResponderEvent } from 'react-native';
import { LogInScreenProps } from 'models/types';
import { createOneButtonAlert, validateEmail } from 'utils';
import useUser from 'hooks/useUser';
import BoxScreen from '../BoxScreen';
import api from 'api/index';
import useUserActions from 'hooks/useUserActions';

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const LogInScreen: React.FC<IProps> = ({ navigation }) => {
  const { isLoggedIn } = useUser();
  const { onLogIn } = useUserActions();
  const [email, setEmail] = useState('lolollg@naver.com');
  const [pw, setPw] = useState('xodud9411!');
  const onPwChange = (text: string) => setPw(text);
  const onPress = async (event: GestureResponderEvent) => {
    if (email === '') {
      createOneButtonAlert('아이디(이메일)을 입력해주세요.');
      return;
    } else if (pw === '') {
      createOneButtonAlert('비밀번호를 입력해주세요.');
      return;
    }
    if (!validateEmail(email)) {
      createOneButtonAlert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    try {
      const form = {
        username: email,
        password: pw,
      };
      const results = await api.token(form);
      // console.log(results.data);
      onLogIn(results.data);
    } catch (error) {
      console.warn(error);
    }
  };
  const goSignUp = () => navigation.navigate('SignUpScreen');
  const goPwChange = () => navigation.navigate('PwScreen');
  return (
    <>
      {!isLoggedIn ? (
        <LogIn
          email={email}
          setEmail={setEmail}
          pw={pw}
          onPwChange={onPwChange}
          onPress={onPress}
          goSignUp={goSignUp}
          goPwChange={goPwChange}
        />
      ) : (
        <BoxScreen />
      )}
    </>
  );
};

export default LogInScreen;
