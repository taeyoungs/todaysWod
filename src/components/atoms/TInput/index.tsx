import React from 'react';
import styled from 'styled-components/native';
import { IComponentProps } from 'models/common';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { CalculateBox } from 'utils';

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
  onChangeText: (text: string) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  size?: number;
  placeholder?: string;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  autoCapitalize?: AutoCapitalize;
}

interface IStyleProps {
  size?: number;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
}

const TextInput = styled.TextInput<IStyleProps>`
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const TInput: React.FC<IProps> = ({
  margin = [0],
  padding = [0],
  width,
  height,
  onChangeText,
  onFocus,
  onBlur,
  size = 14,
  placeholder = '텍스트를 입력해주세요.',
  keyboardType = KeyboardType.DEFAULT,
  returnKeyType = ReturnKeyType.DONE,
  autoCapitalize = AutoCapitalize.NONE,
}) => {
  const styleProps = {
    size,
    margin: CalculateBox(margin),
    padding: CalculateBox(padding),
    width: width ? width : '100%',
    height: height ? height : '40px',
  };
  return (
    <TextInput
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      autoCapitalize={autoCapitalize}
      {...styleProps}
    />
  );
};

export default TInput;
