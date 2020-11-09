import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';
import { IComponentProps } from 'models/common';
import { CalculateBlock, CalculateBox, MPB } from 'utils';
import { ColorType } from 'models/color';

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  activeOpacity?: number;
  backgroundColor?: ColorType;
  borderRadius?: number;
  borderColor?: string;
  border?: [number, number?, number?, number?];
}

interface IStyleProps {
  margin?: string;
  padding?: string;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: ColorType;
}

const TouchableBtn = styled.TouchableOpacity<IStyleProps>`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: 100%;
  border-top-width: ${(props) => props.borderTopWidth}px;
  border-right-width: ${(props) => props.borderRightWidth}px;
  border-bottom-width: ${(props) => props.borderBottomWidth}px;
  border-left-width: ${(props) => props.borderLeftWidth}px;
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`};
  ${(props) => props.borderRadius && `border-color: ${props.borderColor};`};
  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`};
`;

// width: string, bgColor: ColorType, borderRadius: string

const Btn: React.FC<IProps> = ({
  children,
  onPress,
  margin = [0],
  padding = [0],
  activeOpacity = 0.2,
  border = [0],
  borderRadius,
  backgroundColor,
  borderColor,
}) => {
  // const styleProps = {
  //   margin: CalculateBlock(margin, true),
  //   padding: CalculateBlock(padding, false),
  // };
  const borderProps = CalculateBlock(border, MPB.Border);

  const styleProps = {
    margin: CalculateBox(margin),
    padding: CalculateBox(padding),
    borderRadius,
    backgroundColor,
    borderColor,
    ...borderProps,
  };

  return (
    <TouchableBtn
      {...styleProps}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      {children}
    </TouchableBtn>
  );
};

export default Btn;
