import React from 'react';
import { GestureResponderEvent, StatusBar } from 'react-native';
import TInput, { KeyboardType } from 'components/atoms/TInput';
import Img from 'components/atoms/Img';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Block, {
  BorderStyle,
  FlexDirection,
  Sort,
} from 'components/molecules/Block';
import Btn from 'components/atoms/Button';
import Flex from 'components/molecules/Flex';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import Logo from 'components/organisms/Logo';
import InputBox from 'components/organisms/InputBox';
import { ColorPalette } from 'models/color';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'components/atoms/Icon';

interface IProps {
  email: string;
  pw: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onPwChange(text: string): void;
  onPress(event: GestureResponderEvent): void;
  goSignUp(): void;
  goPwChange(): void;
}

const LogIn: React.FC<IProps> = ({
  setEmail,
  onPwChange,
  onPress,
  goSignUp,
  goPwChange,
  email,
  pw,
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
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  keyboardType={KeyboardType.EMAIL}
                />
                {email != '' ? (
                  <Btn onPress={() => setEmail('')}>
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
              <Block width={'100%'}>
                <TouchableOpacity onPress={goPwChange}>
                  <T color={ColorPalette.Main.TXT_LIGHT}>
                    비밀번호를 잊어버리셨나요?
                  </T>
                </TouchableOpacity>
              </Block>
              <Btn
                onPress={onPress}
                activeOpacity={0.6}
                padding={[15, 20]}
                margin={[20, 0]}
                backgroundColor={ColorPalette.Main.TXT}
                borderRadius={20}
              >
                <T
                  color={ColorPalette.Main.BG}
                  fontFamily={FontFamily.NANUM_BOLD}
                  align={TextAlign.CENTER}
                >
                  로그인
                </T>
              </Btn>
              <Block flexDirection={FlexDirection.ROW} width={'100%'}>
                <T color={ColorPalette.Main.TXT_LIGHT}>
                  아직 회원이 아니신가요?{' '}
                </T>
                <TouchableOpacity onPress={goSignUp}>
                  <T color={ColorPalette.Main.TXT}>회원가입</T>
                </TouchableOpacity>
              </Block>
            </Block>
          </Flex>
          <PositionBlock left={-15} bottom={-20} position={Position.ABSOLUTE}>
            <Block
              border={[3]}
              borderColor={ColorPalette.Main.BG_DARK}
              borderRadius={100}
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

export default LogIn;
