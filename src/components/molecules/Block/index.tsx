import React from 'react';
import styled from 'styled-components/native';
import { IComponentProps } from 'models/common';
import { CalculateBlock } from 'utils';
import { ColorType } from 'models/color';

export enum FlexDirection {
  ROW = 'row',
  COLUMN = 'column',
  ROW_REVERSE = 'row-reverse',
  COLUMN_REVERSE = 'column-reverse',
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
  flex?: number;
  flexDirection?: FlexDirection;
  backgroundColor?: ColorType;
  borderRadius?: number;
  sort?: Sort;
  width?: string;
  height?: string;
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
  flex?: number;
  flexDirection?: FlexDirection;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
}

const V = styled.View<IStyleProps>`
  flex: ${(props) => props.flex};
  flex-direction: ${(props) => props.flexDirection};
  margin-top: ${(props) => props.marginTop}px;
  margin-right: ${(props) => props.marginTop}px;
  margin-bottom: ${(props) => props.marginTop}px;
  margin-left: ${(props) => props.marginTop}px;
  padding-top: ${(props) => props.paddingTop}px;
  padding-right: ${(props) => props.paddingRight}px;
  padding-bottom: ${(props) => props.paddingBottom}px;
  padding-left: ${(props) => props.paddingLeft}px;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

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
  flex = 1,
  flexDirection = FlexDirection.COLUMN,
  sort = Sort.CENTER_CENTER,
  width = '100%',
  height = '100%',
}) => {
  const marginProps = CalculateBlock(margin, true);
  const paddingProps = CalculateBlock(padding, false);

  const [horizontal, vertical] = CalculateSort(sort);

  const justifyContent =
    flexDirection === FlexDirection.COLUMN ? horizontal : vertical;
  const alignItems =
    flexDirection === FlexDirection.COLUMN ? vertical : horizontal;

  const styleProps = {
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    ...marginProps,
    ...paddingProps,
    width,
    height,
  };

  return <V {...styleProps}>{children}</V>;
};

export default Block;
