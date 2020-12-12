import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import TInput, { KeyboardType } from 'components/atoms/TInput';
import Img from 'components/atoms/Img';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Block, {
  BorderStyle,
  FlexDirection,
  Sort,
} from 'components/molecules/Block';
import Flex from 'components/molecules/Flex';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import Logo from 'components/organisms/Logo';
import InputBox from 'components/organisms/InputBox';
import { ColorPalette } from 'models/color';

interface IProps {
  email: string;
  pw: string;
  name: string;
  onEmailChange(text: string): void;
  onPwChange(text: string): void;
  onNameChange(text: string): void;
  onPress(event: GestureResponderEvent): void;
  goLogIn(): void;
  clearEmail(): void;
  clearName(): void;
  loading: boolean;
}

const SignUp: React.FC<IProps> = ({
  onEmailChange,
  onPwChange,
  onNameChange,
  onPress,
  email,
  pw,
  name,
  goLogIn,
  loading,
  clearEmail,
  clearName,
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <KeyboardDismiss>
        <Flex width={'100%'}>
          <Flex width={'100%'} sort={Sort.CENTER_BOTTOM}>
            <Logo />
          </Flex>
          <Flex flex={3} width={'100%'} padding={[0, 0, 50, 0]}>
            <Block
              padding={[0, 30]}
              sort={Sort.LEFT_CENTER}
              width={'100%'}
              height={'100%'}
            >
              <InputBox name="at" label="이메일" size={20}>
                <TInput
                  placeholder=""
                  width={'70%'}
                  onChangeText={onEmailChange}
                  value={email}
                  keyboardType={KeyboardType.EMAIL}
                />
                {email != '' ? (
                  <Btn onPress={clearEmail}>
                    <Icon
                      name="close-circle-outline"
                      size={20}
                      color={ColorPalette.Gray.SLATE}
                    />
                  </Btn>
                ) : null}
              </InputBox>
              <InputBox name="contact" label="이름" size={19}>
                <TInput
                  placeholder=""
                  width={'70%'}
                  onChangeText={onNameChange}
                  keyboardType={KeyboardType.DEFAULT}
                  value={name}
                />
                {name != '' ? (
                  <Btn onPress={clearName}>
                    <Icon
                      name="close-circle-outline"
                      size={20}
                      color={ColorPalette.Gray.SLATE}
                    />
                  </Btn>
                ) : null}
              </InputBox>
              <InputBox name="lock" label="비밀번호">
                <TInput
                  placeholder=""
                  width={'70%'}
                  secureTextEntry={true}
                  onChangeText={onPwChange}
                  value={pw}
                />
              </InputBox>
              <Btn
                onPress={onPress}
                activeOpacity={0.6}
                padding={[15, 20]}
                margin={[20, 0]}
                backgroundColor={ColorPalette.Main.TXT}
                borderRadius={25}
              >
                {loading ? (
                  <ActivityIndicator color={ColorPalette.Main.BG_DARK} />
                ) : (
                  <T
                    color={ColorPalette.Main.BG}
                    fontFamily={FontFamily.NANUM_BOLD}
                    align={TextAlign.CENTER}
                    size={16}
                  >
                    회원가입
                  </T>
                )}
              </Btn>
              <Block flexDirection={FlexDirection.ROW} width={'100%'}>
                <T color={ColorPalette.Main.TXT_LIGHT}>
                  이미 가입한 상태인가요?{' '}
                </T>
                <TouchableOpacity onPress={goLogIn}>
                  <T color={ColorPalette.Main.TXT}>로그인</T>
                </TouchableOpacity>
              </Block>
            </Block>
          </Flex>
          <PositionBlock left={-15} bottom={-20} position={Position.ABSOLUTE}>
            <Block
              border={[3]}
              borderColor={ColorPalette.Main.BG_DARK}
              borderRadius={[100]}
              borderStyle={BorderStyle.DASHED}
              padding={[30]}
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

export default SignUp;
