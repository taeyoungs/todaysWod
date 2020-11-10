import TInput, { KeyboardType } from 'components/atoms/TInput';
import Block from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import React from 'react';
import { TextInput } from 'react-native';

interface IProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  ref?: React.RefObject<TextInput>;
}

const NInput: React.FC<IProps> = ({ value, setValue, ref }) => {
  return (
    <Block
      padding={[0, 12]}
      backgroundColor={ColorPalette.Main.BG_DARK}
      borderRadius={5}
      height={'40%'}
      width={'45px'}
    >
      <TInput
        value={value}
        onChangeText={(text) => setValue(text)}
        size={35}
        height={'100%'}
        width={'100%'}
        keyboardType={KeyboardType.NUMBERIC}
        maxLength={1}
        ref={ref}
      />
    </Block>
  );
};

export default NInput;
