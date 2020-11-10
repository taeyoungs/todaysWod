import React, { forwardRef } from 'react';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Flex from 'components/molecules/Flex';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import { ColorPalette } from 'models/color';
import NInput from 'components/organisms/NInput';
import { TextInput } from 'react-native';

interface IProps {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  setOne: React.Dispatch<React.SetStateAction<string>>;
  setTwo: React.Dispatch<React.SetStateAction<string>>;
  setThree: React.Dispatch<React.SetStateAction<string>>;
  setFour: React.Dispatch<React.SetStateAction<string>>;
  setFive: React.Dispatch<React.SetStateAction<string>>;
  setSix: React.Dispatch<React.SetStateAction<string>>;
  ref: Record<string, React.RefObject<TextInput>>;
}

// twoRef: React.RefObject<TextInput>;
//   threeRef: React.RefObject<TextInput>;
//   fourRef: React.RefObject<TextInput>;
//   fiveRef: React.RefObject<TextInput>;
//   sixRef: React.RefObject<TextInput>;

const Certification = forwardRef<JSX.Element, IProps>(props: IProps, ref) => {
//   console.log(props.ref);
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
        <Flex
          width={'85%'}
          flexDirection={FlexDirection.ROW}
          sort={Sort.SPACE_BETWEEN_CENTER}
        >
          <NInput value={one} setValue={setOne} />
          <NInput value={two} setValue={setTwo} ref={twoRef} />
          <NInput value={three} setValue={setThree} />
          <NInput value={four} setValue={setFour} />
          <NInput value={five} setValue={setFive} />
          <NInput value={six} setValue={setSix} />
        </Flex>
        <Flex sort={Sort.CENTER_TOP} width={'80%'}>
          <Btn
            onPress={() => console.log('인증')}
            backgroundColor={ColorPalette.Main.TXT}
            padding={[20]}
            borderRadius={25}
          >
            <T
              align={TextAlign.CENTER}
              fontFamily={FontFamily.NANUM_BOLD}
              color={ColorPalette.Main.BG}
              size={16}
            >
              확인
            </T>
          </Btn>
        </Flex>
      </Flex>
    </KeyboardDismiss>
  );
};

export default Certification;
