import React from 'react';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import TInput, { KeyboardType } from 'components/atoms/TInput';
import Block, { Sort } from 'components/molecules/Block';
import Flex from 'components/molecules/Flex';
import KeyboardDismiss from 'components/molecules/KeyboardDismiss';
import InputBox from 'components/organisms/InputBox';
import { ColorPalette } from 'models/color';
import Icon from 'components/atoms/Icon';

interface IProps {
  sendEmail(): void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Pw: React.FC<IProps> = ({ sendEmail, email, setEmail }) => {
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
          <InputBox name="at" label="이메일" size={25}>
            <TInput
              placeholder=""
              width={'70%'}
              value={email}
              onChangeText={(text) => setEmail(text)}
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
        </Flex>
        <Flex sort={Sort.CENTER_TOP} width={'80%'}>
          <Btn
            onPress={sendEmail}
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
              전송
            </T>
          </Btn>
        </Flex>
      </Flex>
    </KeyboardDismiss>
  );
};

export default Pw;
