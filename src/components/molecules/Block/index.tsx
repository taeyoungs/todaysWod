import React from 'react';
import styled from 'styled-components/native';
import { IComponentProps } from 'models/common';
import { ColorPalette, ColorType } from 'models/color';
import { CalculateBlock, MPB } from 'utils';

export enum FlexDirection {
  ROW = 'row',
  COLUMN = 'column',
  ROW_REVERSE = 'row-reverse',
  COLUMN_REVERSE = 'column-reverse',
}

export enum BorderStyle {
  DOTTED = 'dotted',
  SOLID = 'solid',
  DOUBLE = 'double',
  DASHED = 'dashed',
}

export enum Sort {
  LEFT_TOP = 11,
  LEFT_CENTER = 21,
  LEFT_BOTTOM = 31,
  LEFT_SPACE_BETWEEN = 41,
  LEFT_SPACE_AROUND = 51,
  CENTER_TOP = 12,
  CENTER_CENTER = 22,
  CENTER_BOTTOM = 32,
  CENTER_SPACE_BETWEEN = 42,
  CENTER_SPACE_AROUND = 52,
  RIGHT_TOP = 13,
  RIGHT_CENTER = 23,
  RIGHT_BOTTOM = 33,
  RIGHT_SPACE_BETWEEN = 43,
  RIGHT_SPACE_AROUND = 53,
  SPACE_BETWEEN_TOP = 14,
  SPACE_BETWEEN_CENTER = 24,
  SPACE_BETWEEN_BOTTOM = 34,
  SPACE_AROUND_TOP = 15,
  SPACE_AROUND_CENTER = 25,
  SPACE_AROUND_BOTTOM = 35,
}

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  flexDirection?: FlexDirection;
  backgroundColor?: ColorType;
  borderRadius?: [number, number?, number?, number?];
  borderStyle?: string;
  borderColor?: string;
  border?: [number, number?, number?, number?];
  sort?: Sort;
  width?: string;
  height?: string;
  test?: boolean;
}

interface IStyleProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderStyle?: string;
  borderColor?: string;
  flexDirection?: FlexDirection;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  backgroundColor?: ColorType;
}

const V = styled.View<IStyleProps>`
  flex-direction: ${(props) => props.flexDirection};
  margin-top: ${(props) => props.marginTop}px;
  margin-right: ${(props) => props.marginRight}px;
  margin-bottom: ${(props) => props.marginBottom}px;
  margin-left: ${(props) => props.marginLeft}px;
  padding-top: ${(props) => props.paddingTop}px;
  padding-right: ${(props) => props.paddingRight}px;
  padding-bottom: ${(props) => props.paddingBottom}px;
  padding-left: ${(props) => props.paddingLeft}px;
  border-top-width: ${(props) => props.borderTopWidth}px;
  border-right-width: ${(props) => props.borderRightWidth}px;
  border-bottom-width: ${(props) => props.borderBottomWidth}px;
  border-left-width: ${(props) => props.borderLeftWidth}px;
  border-top-left-radius: ${(props) => props.borderTopLeftRadius}px;
  border-top-right-radius: ${(props) => props.borderTopRightRadius}px;
  border-bottom-left-radius: ${(props) => props.borderBottomLeftRadius}px;
  border-bottom-right-radius: ${(props) => props.borderBottomRightRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-color: ${(props) => props.borderColor};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  background-color: ${(props) => props.backgroundColor};
  ${(props) => props.width && `width: ${props.width};`};
  ${(props) => props.height && `height: ${props.height};`};
  overflow: hidden;
`;

// ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`};

export const CalculateSort = (sort: Sort): string[] => {
  const horizontalNumber = sort % 10;
  const verticalNumber = Math.floor(sort / 10);

  let horizontal = 'center';
  let vertical = 'center';

  if (horizontalNumber === 1) horizontal = 'flex-start';
  else if (horizontalNumber === 3) horizontal = 'flex-end';
  else if (horizontalNumber === 4) horizontal = 'space-between';
  else if (horizontalNumber === 5) horizontal = 'space-around';

  if (verticalNumber === 1) vertical = 'flex-start';
  else if (verticalNumber === 3) vertical = 'flex-end';
  else if (verticalNumber === 4) vertical = 'space-between';
  else if (verticalNumber === 5) vertical = 'space-around';

  return [horizontal, vertical];
};

const Block: React.FC<IProps> = ({
  children,
  margin = [0],
  padding = [0],
  border = [0],
  borderRadius = [0],
  borderStyle = BorderStyle.SOLID,
  flexDirection = FlexDirection.COLUMN,
  backgroundColor = ColorPalette.White.TANSPARENT,
  borderColor = ColorPalette.Black.BLACK,
  sort = Sort.CENTER_CENTER,
  width,
  height,
  test = false,
}) => {
  const marginProps = CalculateBlock(margin, MPB.Margin);
  const paddingProps = CalculateBlock(padding, MPB.Padiing);
  const borderProps = CalculateBlock(border, MPB.Border);
  const borderRadiusProps = CalculateBlock(borderRadius, MPB.BorderRadius);

  const [horizontal, vertical] = CalculateSort(sort);

  const justifyContent =
    flexDirection === FlexDirection.ROW ? horizontal : vertical;
  const alignItems =
    flexDirection === FlexDirection.ROW ? vertical : horizontal;

  if (test) {
    console.log(margin);
    console.log(marginProps);
  }

  const styleProps = {
    flexDirection,
    justifyContent,
    alignItems,
    ...marginProps,
    ...paddingProps,
    ...borderProps,
    ...borderRadiusProps,
    borderStyle,
    borderColor,
    width,
    height,
    backgroundColor,
  };

  return <V {...styleProps}>{children}</V>;
};

export default Block;
