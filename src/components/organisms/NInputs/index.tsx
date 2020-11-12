import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import { KeyboardType } from 'components/atoms/TInput';
import Block from 'components/molecules/Block';
import { ColorPalette } from 'models/color';

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
}

const NInputs: React.FC<IProps> = ({
  one,
  two,
  three,
  four,
  five,
  six,
  setOne,
  setTwo,
  setThree,
  setFour,
  setFive,
  setSix,
}) => {
  const oneRef = useRef<TextInput>(null);
  const twoRef = useRef<TextInput>(null);
  const threeRef = useRef<TextInput>(null);
  const fourRef = useRef<TextInput>(null);
  const fiveRef = useRef<TextInput>(null);
  const sixRef = useRef<TextInput>(null);

  const styleProps = {
    fontSize: 35,
    height: '100%',
    width: '100%',
    color: ColorPalette.Main.TXT,
  };

  const blockStyleProps = {
    backgroundColor: ColorPalette.Main.BG_DARK,
    borderRadius: [5],
    height: '40%',
    width: '45px',
  };

  const inputProps = {
    keyboardType: KeyboardType.NUMBERIC,
    maxLength: 1,
    selectionColor: ColorPalette.Main.TXT_LIGHT,
  };

  return (
    <>
      <Block {...blockStyleProps} padding={[0, 12]}>
        <TextInput
          value={one}
          onChangeText={(text) => {
            setOne(text);
            if (text.length === 1) twoRef.current?.focus();
          }}
          style={{ ...styleProps }}
          {...inputProps}
          ref={oneRef}
        />
      </Block>
      <Block {...blockStyleProps} padding={[0, 12]}>
        <TextInput
          value={two}
          onChangeText={(text) => {
            setTwo(text);
            if (text.length === 1) threeRef.current?.focus();
            if (text.length === 0) oneRef.current?.focus();
          }}
          style={{ ...styleProps }}
          {...inputProps}
          ref={twoRef}
        />
      </Block>
      <Block {...blockStyleProps} padding={[0, 12]}>
        <TextInput
          value={three}
          onChangeText={(text) => {
            setThree(text);
            if (text.length === 1) fourRef.current?.focus();
            if (text.length === 0) twoRef.current?.focus();
          }}
          style={{ ...styleProps }}
          {...inputProps}
          ref={threeRef}
        />
      </Block>
      <Block {...blockStyleProps} padding={[0, 12]}>
        <TextInput
          value={four}
          onChangeText={(text) => {
            setFour(text);
            if (text.length === 1) fiveRef.current?.focus();
            if (text.length === 0) threeRef.current?.focus();
          }}
          style={{ ...styleProps }}
          {...inputProps}
          ref={fourRef}
        />
      </Block>
      <Block {...blockStyleProps} padding={[0, 12]}>
        <TextInput
          value={five}
          onChangeText={(text) => {
            setFive(text);
            if (text.length === 1) sixRef.current?.focus();
            if (text.length === 0) fourRef.current?.focus();
          }}
          style={{ ...styleProps }}
          {...inputProps}
          ref={fiveRef}
        />
      </Block>
      <Block {...blockStyleProps} padding={[0, 12]}>
        <TextInput
          value={six}
          onChangeText={(text) => {
            setSix(text);
            if (text.length === 1) sixRef.current?.blur();
            if (text.length === 0) fiveRef.current?.focus();
          }}
          style={{ ...styleProps }}
          {...inputProps}
          ref={sixRef}
        />
      </Block>
    </>
  );
};

export default NInputs;
