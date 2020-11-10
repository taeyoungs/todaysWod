import React, { useState } from 'react';
import Certification from 'components/templates/Auth/Certification';
import { CertificationScreenProps } from 'models/types';
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
    />
  );
};

export default CertificationScreen;
