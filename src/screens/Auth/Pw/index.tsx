import React, { useState } from 'react';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import Flex from 'components/molecules/Flex';
import Block, { Sort } from 'components/molecules/Block';
import AuthItem from 'components/organisms/AuthItem';
import AuthButton from 'components/organisms/AuthButton';
import { ColorPalette } from 'models/color';
import { PwScreenProps } from 'models/types';
import { createOneButtonAlert, validateEmail } from 'utils';
import api from 'api';

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
      await api.pw_reset(form).then((res) => {
        if (res.status === 200) navigation.navigate('Certification', { email });
      });
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

  return (
    <KeyboardDismiss>
      <Flex>
        <Flex sort={Sort.CENTER_BOTTOM}>
          <Block width={'70%'}>
            <T
              color={ColorPalette.Main.TXT}
              fontFamily={FontFamily.NANUM_BOLD}
              size={30}
              margin={[10, 0]}
            >
              이메일 입력
            </T>
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={12}
              align={TextAlign.CENTER}
            >
              인증번호를 받을 이메일을 입력해주세요. 인증번호 확인 후 비밀번호
              재설정 화면으로 넘어갑니다.
            </T>
          </Block>
        </Flex>
        <Flex width={'90%'}>
          <AuthItem
            label="이메일"
            name="at"
            size={22}
            value={email}
            setValue={setEmail}
          />
        </Flex>
        <Flex sort={Sort.CENTER_TOP}>
          <AuthButton
            loading={loading}
            onPress={sendEmail}
            text="전송"
            big={true}
          />
        </Flex>
      </Flex>
    </KeyboardDismiss>
  );
};

export default PwScreen;
