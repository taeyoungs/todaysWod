import React from 'react';
import Icon from 'components/atoms/Icon';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import T from 'components/atoms/T';

interface IProps {
  name: string;
  label: string;
  children: React.ReactNode;
  size?: number;
}

const InputBox: React.FC<IProps> = ({ name, children, label, size }) => {
  return (
    <Block
      width={'100%'}
      border={[0, 0, 1, 0]}
      borderColor={ColorPalette.Main.TXT_LIGHT}
      flexDirection={FlexDirection.ROW}
      sort={Sort.LEFT_CENTER}
      margin={[0, 0, 20, 0]}
    >
      <Block
        padding={[15, 15]}
        border={[0, 1, 0, 0]}
        margin={[0, 10, 0, 0]}
        borderColor={ColorPalette.Main.TXT_LIGHT}
      >
        <Icon name={name} color={ColorPalette.Main.TXT} size={size} />
      </Block>
      <Block width={'100%'} sort={Sort.LEFT_CENTER}>
        <T size={12} color={ColorPalette.Main.TXT_LIGHT}>
          {label}
        </T>
        <Block
          margin={[5, 0, 0, 0]}
          width={'100%'}
          flexDirection={FlexDirection.ROW}
          sort={Sort.LEFT_CENTER}
        >
          {children}
        </Block>
      </Block>
    </Block>
  );
};

export default InputBox;
