import React from 'react';
import styled from 'styled-components/native';
import { CalculateBlock, MPB } from 'utils';
import { IComponentProps } from 'models/common';
import { ColorPalette, ColorType } from 'models/color';
import { FlexDirection, Sort, BorderStyle } from 'components/molecules/Block';

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  flex?: number;
  flexDirection?: FlexDirection;
  backgroundColor?: ColorType;
  borderRadius?: [number, number?, number?, number?];
  borderStyle?: string;
  borderColor?: string;
  border?: [number, number?, number?, number?];
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
  flex?: number;
  flexDirection?: FlexDirection;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  backgroundColor?: ColorType;
}

const V = styled.View<IStyleProps>`
  flex: ${(props) => props.flex};
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
`;

// width: ${(props) => props.width};
// height: ${(props) => props.height};

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

const Flex: React.FC<IProps> = ({
  children,
  margin = [0],
  padding = [0],
  flex = 1,
  border = [0],
  borderRadius = [0],
  borderStyle = BorderStyle.SOLID,
  flexDirection = FlexDirection.COLUMN,
  backgroundColor = ColorPalette.Main.BG,
  borderColor = ColorPalette.Black.BLACK,
  sort = Sort.CENTER_CENTER,
  width,
  height,
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

  const styleProps = {
    flex,
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

export default Flex;
