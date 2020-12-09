import React, { useState } from 'react';
import Certification from 'components/templates/Auth/Certification';
import useUserActions from 'hooks/useUserActions';
import useUser from 'hooks/useUser';
import { BoxEnrollScreenProps } from 'models/types';
import { createOneButtonAlert, validateEmpty } from 'utils';
import api from 'api';

interface IProps {
  navigation: BoxEnrollScreenProps['navigation'];
}

const BoxErollScreen: React.FC<IProps> = ({ navigation }) => {
  const { onEnrollBox } = useUserActions();
  const { token } = useUser();
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
    const form = {
      certification_code: `${one}${two}${three}${four}${five}${six}`,
    };
    setLoading(true);
    try {
      const results = await api.boxAuthentication(form, token);
      // console.log(results.data);
      onEnrollBox(results.data);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
      navigation.navigate('BoxScreen');
    }
  };
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
      title="박스 인증 코드"
      subtitle="등록하고자 하는 박스 인증 코드를 입력해주세요. 
      인증 후 해당 박스로 회원권 등록 요청이 발송됩니다."
      btnText="확인"
    />
  );
};

export default BoxErollScreen;
