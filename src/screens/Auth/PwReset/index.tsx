import React, { useState } from 'react';
import PwReset from 'components/templates/Auth/PwReset';
import { PwResetScreenProps } from 'models/types';
import { createOneButtonAlert } from 'utils';
import api from 'api';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import Flex from 'components/molecules/Flex';
import Block, { Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import AuthItem from 'components/organisms/AuthItem';
import AuthButton from 'components/organisms/AuthButton';
import Btn from 'components/atoms/Button';

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
      const results = await api.pw_set(form).then((res) => {
        if (res.status === 200) navigation.navigate('LogIn');
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const goLogin = () => navigation.navigate('LogIn');
  return (
    <KeyboardDismiss>
      <Flex>
        <Flex>
          <Block width={'80%'}>
            <T
              color={ColorPalette.Main.TXT}
              fontFamily={FontFamily.NANUM_BOLD}
              size={30}
              margin={[10, 0]}
            >
              비밀번호 재설정
            </T>
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={12}
              align={TextAlign.CENTER}
            >
              원하시는 비밀번호를 입력해주세요.
            </T>
          </Block>
        </Flex>
        <Flex width={'85%'} margin={[0, 0, 20, 0]}>
          <AuthItem
            name="lock"
            label="비밀번호"
            value={pw}
            setValue={setPw}
            secureTextEntry={true}
          />
          <AuthItem
            name="lock"
            label="비밀번호 확인"
            value={confirmPw}
            setValue={setConfirmPw}
            secureTextEntry={true}
          />
        </Flex>
        <Flex sort={Sort.CENTER_TOP}>
          <AuthButton
            onPress={handleSubmit}
            text="변경"
            loading={loading}
            big={true}
          />
          <Block>
            <Btn onPress={goLogin} padding={[10]}>
              <T color={ColorPalette.Main.TXT}>로그인 화면으로 돌아가기</T>
            </Btn>
          </Block>
        </Flex>
      </Flex>
    </KeyboardDismiss>
  );
};

export default PwResetScreen;
