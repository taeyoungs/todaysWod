import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import LogIn from 'components/templates/Auth/LogIn';
import useUserActions from 'hooks/useUserActions';
import { LogInScreenProps } from 'models/types';
import { createOneButtonAlert, validateEmail } from 'utils';
import api from 'api';

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const LogInScreen: React.FC<IProps> = ({ navigation }) => {
  const { onLogIn } = useUserActions();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const form = {
        username: email,
        password: pw,
      };
      await api.token(form).then((res) => {
        setLoading(false);
        onLogIn(res.data);
      });
      // console.log(results.data);
    } catch (error) {
      console.warn(error);
      setLoading(false);
      if (error.message === 'Request failed with status code 404') {
        createOneButtonAlert('존재하지 않는 아이디(이메일)입니다.');
      } else if (error.message === 'Request failed with status code 401') {
        createOneButtonAlert('아이디와 비밀번호가 일치하지 않습니다.');
      }
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
      loading={loading}
    />
  );
};

export default LogInScreen;
