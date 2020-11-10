import React, { useState } from 'react';
import Pw from 'components/templates/Auth/Pw';
import { PwScreenProps } from 'models/types';
import api from 'api';
import { createOneButtonAlert, validateEmail } from 'utils';

interface IProps {
  navigation: PwScreenProps['navigation'];
}

const PwScreen: React.FC<IProps> = ({ navigation }) => {
  const [email, setEmail] = useState('lolollg@naver.com');
  const [loading, setLoading] = useState(false);
  const sendEmail = async () => {
    if (!validateEmail(email)) {
      createOneButtonAlert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    try {
      const form = {
        email,
      };
      setLoading(true);
      const results = await api.pw_reset(form);
      // navigation.setParams(form);
      // navigation.navigate('CertificationScreen', form);
      if (results.status === 200) {
        navigation.navigate('CertificationScreen', { email });
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 404') {
        createOneButtonAlert('가입한 적 없는 이메일입니다.');
        return;
      }
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };
  // const goCertification = () => navigation.navigate()

  return (
    <Pw
      sendEmail={sendEmail}
      email={email}
      setEmail={setEmail}
      loading={loading}
    />
  );
};

export default PwScreen;
