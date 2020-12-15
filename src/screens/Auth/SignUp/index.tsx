import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import T from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Logo from 'components/organisms/Logo';
import AuthItem from 'components/organisms/AuthItem';
import ModalConfirm from 'components/organisms/ModalConfirm';
import AuthButton from 'components/organisms/AuthButton';
import { LogInScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';
import { createOneButtonAlert, validateEmail } from 'utils';
import api from 'api';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const SignUpScreen: React.FC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('lolollg@naver.com');
  const [pw, setPw] = useState('xodud9411!');
  const [name, setName] = useState('박수민');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const onPress = async () => {
    if (email === '') {
      createOneButtonAlert('이메일(아이디)을 입력해주세요.');
      return;
    } else if (pw === '') {
      createOneButtonAlert('비밀번호를 입력해주세요.');
      return;
    } else if (name === '') {
      createOneButtonAlert('이름을 입력해주세요.');
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
        email,
        password: pw,
        last_name: name,
      };
      await api.signUp(form).then(() => {
        setLoading(false);
        navigation.navigate('LogIn');
      });
    } catch (error) {
      console.warn(error);
      setLoading(false);
      if (error.message === 'Request failed with status code 409') {
        createOneButtonAlert('이미 존재하는 아이디(이메일)입니다.');
      }
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Flex width={`${width}px`}>
        <Block width={'100%'} sort={Sort.CENTER_BOTTOM} margin={[60, 0, 0, 0]}>
          <Logo />
        </Block>
        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
          <Flex flex={3} width={'100%'} padding={[0, 0, 50, 0]}>
            <AuthItem
              label="이름"
              name="contact"
              value={name}
              setValue={setName}
              size={22}
              setConfirmVisible={setConfirmVisible}
            />
            <AuthItem
              label="이메일 (아이디)"
              name="at"
              value={email}
              setValue={setEmail}
              size={22}
              setConfirmVisible={setConfirmVisible}
            />
            <AuthItem
              label="비밀번호"
              name="lock"
              value={pw}
              setValue={setPw}
              size={24}
              setConfirmVisible={setConfirmVisible}
              secureTextEntry={true}
            />
            <AuthButton onPress={onPress} loading={loading} text="회원가입" />
            <Block
              flexDirection={FlexDirection.ROW}
              width={`${width - 40}px`}
              margin={[0, 20]}
            >
              <T color={ColorPalette.Main.TXT_LIGHT}>
                이미 가입한 상태인가요?{' '}
              </T>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('LogIn')}
                style={{ padding: 5 }}
              >
                <T color={ColorPalette.Main.TXT}>로그인</T>
              </TouchableWithoutFeedback>
            </Block>
          </Flex>
        </KeyboardAvoidingView>
      </Flex>
      <ModalConfirm
        isVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible}
      />
    </>
  );
};

export default SignUpScreen;
