import React, { useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import Block, { Sort } from 'components/molecules/Block';
import AuthItem from 'components/organisms/AuthItem';
import AuthButton from 'components/organisms/AuthButton';
import { ColorPalette } from 'models/color';
import { CertificationScreenProps } from 'models/types';
import { createOneButtonAlert } from 'utils';
import api from 'api';

const { width } = Dimensions.get('screen');

interface IProps {
  route: CertificationScreenProps['route'];
  navigation: CertificationScreenProps['navigation'];
}

const CertificationScreen: React.FC<IProps> = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const handleSubmit = async () => {
    if (number.length != 6) {
      createOneButtonAlert('6자리 모두 입력해주세요.');
      return;
    }
    try {
      const form = {
        certification_number: number,
        email: route.params.email,
      };
      setLoading(true);
      const results = await api.certification(form);
      if (results.status === 200) {
        navigation.navigate('PwReset', { email: route.params.email });
      }
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardDismiss>
      <StatusBar barStyle="light-content" />
      <Flex width={`${width}px`}>
        <Flex sort={Sort.CENTER_BOTTOM}>
          <Block width={'80%'}>
            <T
              color={ColorPalette.Main.TXT}
              fontFamily={FontFamily.NANUM_BOLD}
              size={30}
              margin={[10, 0]}
            >
              인증번호 입력
            </T>
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={12}
              align={TextAlign.CENTER}
            >
              이메일에 적혀있는 인증번호를 입력해주세요.
            </T>
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={12}
              align={TextAlign.CENTER}
            >
              인증번호가 맞다면 비밀번호 재설정 화면으로 이동합니다.
            </T>
          </Block>
        </Flex>
        <Flex width={`${width - 40}px`} margin={[0, 20]}>
          <AuthItem
            label="인증번호"
            name="lock"
            value={number}
            setValue={setNumber}
            secureTextEntry={true}
          />
        </Flex>
        <Flex sort={Sort.CENTER_TOP}>
          <AuthButton
            onPress={handleSubmit}
            text="확인"
            loading={loading}
            big={true}
          />
        </Flex>
      </Flex>
    </KeyboardDismiss>
  );
};

export default CertificationScreen;
