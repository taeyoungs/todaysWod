import React, { useState } from 'react';
import Certification from 'components/templates/Auth/Certification';
import { CertificationScreenProps } from 'models/types';
import { createOneButtonAlert, validateEmpty } from 'utils';
import api from 'api';

interface IProps {
  route: CertificationScreenProps['route'];
  navigation: CertificationScreenProps['navigation'];
}

const CertificationScreen: React.FC<IProps> = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [five, setFive] = useState('');
  const [six, setSix] = useState('');
  const handleSubmit = async () => {
    if (!validateEmpty(one, two, three, four, five, six)) {
      createOneButtonAlert('6자리 모두 입력해주세요.');
      return;
    }
    try {
      const form = {
        certification_number: `${one}${two}${three}${four}${five}${six}`,
        email: route.params.email,
      };
      setLoading(true);
      const results = await api.certification(form);
      if (results.status === 200) {
        navigation.navigate('PwResetScreen', { email: route.params.email });
      }
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
    }
  };
  // console.log(route);
  return (
    <Certification
      one={one}
      two={two}
      three={three}
      four={four}
      five={five}
      six={six}
      setOne={setOne}
      setTwo={setTwo}
      setThree={setThree}
      setFour={setFour}
      setFive={setFive}
      setSix={setSix}
      handleSubmit={handleSubmit}
      loading={loading}
      title="인증번호 입력"
      subtitle="이메일에 적혀있는 인증번호를 입력해주세요. 
      인증번호가 맞다면 비밀번호 재설정 화면으로 이동합니다."
      btnText="확인"
    />
  );
};

export default CertificationScreen;
