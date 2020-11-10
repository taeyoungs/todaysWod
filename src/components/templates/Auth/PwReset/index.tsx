import React from 'react';
import { ActivityIndicator } from 'react-native';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import TInput from 'components/atoms/TInput';
import Btn from 'components/atoms/Button';
import Block, { Sort } from 'components/molecules/Block';
import Flex from 'components/molecules/Flex';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import InputBox from 'components/organisms/InputBox';
import { ColorPalette } from 'models/color';

interface IProps {
  pw: string;
  confirmPw: string;
  setPw: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPw: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit(): Promise<void>;
  goLogin(): void;
  loading: boolean;
}

const PwReset: React.FC<IProps> = ({
  pw,
  confirmPw,
  setPw,
  setConfirmPw,
  handleSubmit,
  goLogin,
  loading,
}) => {
  return (
    <KeyboardDismiss>
      <Flex>
        <Flex sort={Sort.CENTER_BOTTOM}>
          <Block width={'80%'} margin={[0, 0, 10, 0]}>
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
        <Flex width={'85%'}>
          <InputBox name="lock" label="비밀번호">
            <TInput
              placeholder=""
              width={'70%'}
              secureTextEntry={true}
              value={pw}
              onChangeText={(text) => setPw(text)}
              padding={[5, 0]}
            />
          </InputBox>
          <InputBox name="lock" label="비밀번호 확인">
            <TInput
              placeholder=""
              width={'70%'}
              secureTextEntry={true}
              value={confirmPw}
              onChangeText={(text) => setConfirmPw(text)}
              padding={[5, 0]}
            />
          </InputBox>
        </Flex>
        <Flex sort={Sort.CENTER_TOP} width={'80%'}>
          <Btn
            onPress={handleSubmit}
            backgroundColor={ColorPalette.Main.TXT}
            padding={[20]}
            borderRadius={25}
          >
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <T
                align={TextAlign.CENTER}
                fontFamily={FontFamily.NANUM_BOLD}
                color={ColorPalette.Main.BG}
                size={16}
              >
                변경
              </T>
            )}
          </Btn>
          <Block margin={[20, 0, 0, 0]}>
            <Btn onPress={goLogin} padding={[10]}>
              <T color={ColorPalette.Main.TXT}>로그인 화면으로 돌아가기</T>
            </Btn>
          </Block>
        </Flex>
      </Flex>
    </KeyboardDismiss>
  );
};

export default PwReset;
