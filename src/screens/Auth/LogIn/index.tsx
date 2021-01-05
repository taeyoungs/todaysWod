import React, { useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import T from 'components/atoms/T';
import Img from 'components/atoms/Img';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import Flex from 'components/molecules/Flex';
import Block, {
  BorderStyle,
  FlexDirection,
  Sort,
} from 'components/molecules/Block';
import Logo from 'components/organisms/Logo';
import AuthItem from 'components/organisms/AuthItem';
import AuthButton from 'components/organisms/AuthButton';
import useUserActions from 'hooks/useUserActions';
import { ColorPalette } from 'models/color';
import { LogInScreenProps } from 'models/types';
import { createOneButtonAlert, validateEmail } from 'utils';
import api from 'api';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: LogInScreenProps['navigation'];
}

const LogInScreen: React.FC<IProps> = ({ navigation }) => {
  const { onLogIn } = useUserActions();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const onPress = async () => {
    if (email === '') {
      createOneButtonAlert('아이디(이메일)을 입력해주세요.');
      return;
    } else if (pw === '') {
      createOneButtonAlert('비밀번호를 입력해주세요.');
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
        password: pw,
      };
      await api.token(form).then((res) => {
        setLoading(false);
        onLogIn(res.data);
      });
    } catch (error) {
      console.warn(error);
      setLoading(false);
      if (error.message === 'Request failed with status code 404') {
        createOneButtonAlert('존재하지 않는 아이디(이메일)입니다.');
      } else if (error.message === 'Request failed with status code 401') {
        createOneButtonAlert('아이디와 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <KeyboardDismiss>
        <Flex width={`${width}px`}>
          <Block
            width={'100%'}
            sort={Sort.CENTER_BOTTOM}
            margin={[60, 0, 0, 0]}
          >
            <Logo />
          </Block>
          <Flex flex={3} width={'100%'} padding={[0, 0, 70, 0]}>
            <Block sort={Sort.LEFT_CENTER} width={`${width}px`} height={'100%'}>
              <AuthItem
                label="이메일"
                value={email}
                setValue={setEmail}
                name="at"
                size={22}
              />
              <AuthItem
                label="비밀번호"
                value={pw}
                setValue={setPw}
                name="lock"
                size={24}
                secureTextEntry={true}
              />
              <Block width={'100%'}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Pw')}
                  style={{ padding: 5, marginTop: 10 }}
                >
                  <T color={ColorPalette.Main.TXT_LIGHT}>
                    비밀번호를 잊어버리셨나요?
                  </T>
                </TouchableWithoutFeedback>
              </Block>
              <AuthButton loading={loading} onPress={onPress} text="로그인" />
              <Block flexDirection={FlexDirection.ROW} width={'100%'}>
                <T color={ColorPalette.Main.TXT_LIGHT}>
                  아직 회원이 아니신가요?{' '}
                </T>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('SignUp')}
                  style={{ padding: 5 }}
                >
                  <T color={ColorPalette.Main.TXT}>회원가입</T>
                </TouchableWithoutFeedback>
              </Block>
            </Block>
          </Flex>
          <PositionBlock left={-30} bottom={-30} position={Position.ABSOLUTE}>
            <Block
              border={[3]}
              borderColor={ColorPalette.Main.BG_DARK}
              borderRadius={[100]}
              borderStyle={BorderStyle.DASHED}
              padding={[40]}
            >
              <Img
                width={60}
                height={60}
                sourceImg={require('assets/images/dark_dbell.png')}
              />
            </Block>
          </PositionBlock>
        </Flex>
      </KeyboardDismiss>
    </>
  );
};

export default LogInScreen;
