import React, { useState } from 'react';
import styled from 'styled-components/native';
import { IComponentProps } from 'models/common';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
} from 'react-native';
import { CalculateBlock, MPB } from 'utils';
import { ColorPalette, ColorType } from 'models/color';
import Icon from '../Icon';

export enum KeyboardType {
  DEFAULT = 'default',
  EMAIL = 'email-address',
  NUMBERIC = 'numeric',
  PHONEPAD = 'phone-pad',
  NUMBERPAD = 'number-pad',
  VISIBLE_PASSWORD = 'visible-password',
}

export enum ReturnKeyType {
  DONE = 'done',
  GO = 'go',
  NEXT = 'next',
  SEARCH = 'search',
  SEND = 'send',
}

export enum AutoCapitalize {
  NONE = 'none',
  WORDS = 'words',
  SENTENCES = 'sentences',
  CHARACTERS = 'characters',
}

interface IProps extends IComponentProps {
  width?: string;
  height?: string;
  onChangeText?(text: string): void;
  value: string;
  onFocus?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
  size?: number;
  color?: ColorType;
  placeholder?: string;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  autoCapitalize?: AutoCapitalize;
  secureTextEntry?: boolean;
}

interface IStyleProps {
  size?: number;
  color?: ColorType;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  width?: string;
  height?: string;
}

const TextInput = styled.TextInput<IStyleProps>`
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
  margin-top: ${(props) => props.marginTop}px;
  margin-right: ${(props) => props.marginRight}px;
  margin-bottom: ${(props) => props.marginBottom}px;
  margin-left: ${(props) => props.marginLeft}px;
  padding-top: ${(props) => props.paddingTop}px;
  padding-right: ${(props) => props.paddingRight}px;
  padding-bottom: ${(props) => props.paddingBottom}px;
  padding-left: ${(props) => props.paddingLeft}px;
  ${(props) => props.width && `width: ${props.width};`};
  ${(props) => props.height && `height: ${props.height};`};
`;

const TInput: React.FC<IProps> = ({
  margin = [0],
  padding = [0],
  width,
  height,
  onChangeText,
  value,
  onFocus,
  onBlur,
  size = 16,
  color = ColorPalette.Main.TXT,
  placeholder = '텍스트를 입력해주세요.',
  keyboardType = KeyboardType.DEFAULT,
  returnKeyType = ReturnKeyType.DONE,
  autoCapitalize = AutoCapitalize.NONE,
  secureTextEntry = false,
}) => {
  const marginProps = CalculateBlock(margin, MPB.Margin);
  const paddingProps = CalculateBlock(padding, MPB.Padiing);
  const [isShow, setIsShow] = useState(secureTextEntry);

  const styleProps = {
    size,
    ...marginProps,
    ...paddingProps,
    width,
    height,
    color,
  };
  return (
    <>
      <TextInput
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={isShow}
        {...styleProps}
        placeholderTextColor={ColorPalette.Main.TXT_LIGHT}
      />
      {secureTextEntry ? (
        <TouchableOpacity onPress={() => setIsShow((prevState) => !prevState)}>
          <Icon
            name={isShow ? 'eye' : 'eye-off'}
            color={ColorPalette.Gray.SLATE}
            size={22}
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default TInput;
