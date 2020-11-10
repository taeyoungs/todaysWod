import React, { useState } from 'react';
import PwReset from 'components/templates/Auth/PwReset';
import { PwResetScreenProps } from 'models/types';
import { createOneButtonAlert } from 'utils';
import api from 'api';

interface IProps {
  navigation: PwResetScreenProps['navigation'];
  route: PwResetScreenProps['route'];
}

const PwResetScreen: React.FC<IProps> = ({ navigation, route }) => {
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (pw === '') {
      createOneButtonAlert('비밀번호를 입력해주세요.');
      return;
    } else if (confirmPw === '') {
      createOneButtonAlert('비밀번호 확인을 입력해주세요.');
      return;
    }
    if (pw !== confirmPw) {
      createOneButtonAlert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const form = {
        email: route.params.email,
        pw,
      };
      setLoading(true);
      const results = await api.pw_set(form);
      // console.log(results.status);
      if (results.status === 200) {
        navigation.navigate('LogInScreen');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const goLogin = () => navigation.navigate('LogInScreen');
  return (
    <PwReset
      pw={pw}
      setPw={setPw}
      confirmPw={confirmPw}
      setConfirmPw={setConfirmPw}
      handleSubmit={handleSubmit}
      goLogin={goLogin}
      loading={loading}
    />
  );
};

export default PwResetScreen;
