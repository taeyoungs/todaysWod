import React from 'react';
import styled from 'styled-components/native';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { CalculateBlock } from 'utils';
import { IComponentProps } from 'models/common';
import { ColorType } from 'models/color';
import { FlexDirection } from 'components/molecules/Block';

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  flex?: number;
  flexDirection?: FlexDirection;
  backgroundColor?: ColorType;
  borderRadius?: number;
  width?: string;
  height?: string;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
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

const ScrollV = styled.ScrollView<IStyleProps>`
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
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Scroll: React.FC<IProps> = ({
  children,
  margin = [0],
  padding = [0],
  flex = 1,
  flexDirection = FlexDirection.COLUMN,
  width = '100%',
  height = '100%',
  onScroll,
}) => {
  const marginProps = CalculateBlock(margin, true);
  const paddingProps = CalculateBlock(padding, false);

  const styleProps = {
    flex,
    flexDirection,
    ...marginProps,
    ...paddingProps,
    width,
    height,
  };

  return (
    <ScrollV onScroll={onScroll} {...styleProps}>
      {children}
    </ScrollV>
  );
};

export default Scroll;
