import React from 'react';
import styled from 'styled-components/native';
import { CalculateBox } from 'utils';
import { IComponentProps } from 'models/common';
import { ColorPalette } from 'models/color';

export enum TextAlign {
  AUTO = 'auto',
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum TextTransform {
  NONE = 'none',
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
  CAPITALIZE = 'capitalize',
}

export enum TextDecoration {
  NONE = 'none',
  UNDERLINE = 'underline',
  LINETHROUGH = 'line-through',
}

export enum FontFamily {
  NANUM_REGULAR = 'nanumGothic-regular',
  NANUM_BOLD = 'nanumGothic-bold',
}

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  align?: TextAlign;
  transform?: TextTransform;
  decoration?: TextDecoration;
  fontFamily?: FontFamily;
}

interface IStyleProps {
  color?: string;
  align?: string;
  size?: number;
  transform?: string;
  margin?: string;
  decoration?: string;
  fontFamily?: string;
}

const Text = styled.Text<IStyleProps>`
  color: ${(props) => props.color};
  text-align: ${(props) => props.align};
  font-size: ${(props) => props.size}px;
  text-transform: ${(props) => props.transform};
  margin: ${(props) => props.margin};
  text-decoration: ${(props) => props.decoration};
  font-family: ${(props) => props.fontFamily};
`;

const T: React.FC<IProps> = ({
  className,
  children,
  color = ColorPalette.Black.BLACK,
  size = 14,
  margin = [0],
  align = TextAlign.LEFT,
  transform = TextTransform.NONE,
  decoration = TextDecoration.NONE,
  fontFamily = FontFamily.NANUM_REGULAR,
}) => {
  // const classProps = className;
  const styleProps = {
    color,
    align,
    size,
    transform,
    margin: CalculateBox(margin),
    decoration,
    fontFamily,
  };

  return <Text {...styleProps}>{children}</Text>;
};

export default T;
