import React, { useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import Flex from 'components/molecules/Flex';
import Block, { Sort } from 'components/molecules/Block';
import AuthItem from 'components/organisms/AuthItem';
import AuthButton from 'components/organisms/AuthButton';
import useUserActions from 'hooks/useUserActions';
import useUser from 'hooks/useUser';
import { BoxEnrollScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';
import { IEnrollBoxProps } from 'store/usersSlice';
import { createOneButtonAlert } from 'utils';
import api from 'api';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: BoxEnrollScreenProps['navigation'];
}

const BoxErollScreen: React.FC<IProps> = ({ navigation }) => {
  const { onEnrollBox } = useUserActions();
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const handleSubmit = async () => {
    if (number.length != 6) {
      createOneButtonAlert('6자리 모두 입력해주세요.');
      return;
    }
    const form = {
      certification_code: number,
    };
    setLoading(true);
    try {
      const results = await api.boxAuthentication(form, token);
      const data: IEnrollBoxProps = results.data;
      onEnrollBox(results.data);
      if (data.registrationState === 'pending') {
        setLoading(false);
        navigation.navigate('BoxScreen');
      }
    } catch (error) {
      console.warn(error);
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
              박스 인증 코드
            </T>
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={12}
              align={TextAlign.CENTER}
            >
              등록하고자 하는 박스 인증 코드를 입력해주세요.
            </T>
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={12}
              align={TextAlign.CENTER}
            >
              인증 후 해당 박스로 회원권 등록 요청이 발송됩니다.
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

export default BoxErollScreen;
