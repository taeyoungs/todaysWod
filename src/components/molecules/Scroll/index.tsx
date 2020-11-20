import React from 'react';
import styled from 'styled-components/native';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  RefreshControlProps,
} from 'react-native';
import { CalculateBlock, MPB } from 'utils';
import { IComponentProps } from 'models/common';
import { ColorPalette, ColorType } from 'models/color';
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
  refreshing?: boolean;
  onRefresh?(): void;
  refreshColor?: string;
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
  backgroundColor?: string;
}

const ScrollV = styled.ScrollView<IStyleProps>`
  flex-direction: ${(props) => props.flexDirection};
  margin-top: ${(props) => props.marginTop}px;
  margin-right: ${(props) => props.marginTop}px;
  margin-bottom: ${(props) => props.marginTop}px;
  margin-left: ${(props) => props.marginTop}px;
  padding-top: ${(props) => props.paddingTop}px;
  padding-right: ${(props) => props.paddingRight}px;
  padding-bottom: ${(props) => props.paddingBottom}px;
  padding-left: ${(props) => props.paddingLeft}px;
  ${(props) => props.width && `width: ${props.width}`};
  ${(props) => props.height && `height: ${props.height}`};
  background-color: ${(props) => props.backgroundColor};
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
  refreshing = false,
  onRefresh,
  backgroundColor = ColorPalette.Main.BG,
  refreshColor = 'white',
}) => {
  const marginProps = CalculateBlock(margin, MPB.Margin);
  const paddingProps = CalculateBlock(padding, MPB.Padiing);

  const styleProps = {
    flex,
    flexDirection,
    ...marginProps,
    ...paddingProps,
    width,
    height,
    backgroundColor,
  };

  return (
    <ScrollV
      onScroll={onScroll}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={refreshColor}
        />
      }
      {...styleProps}
    >
      {children}
    </ScrollV>
  );
};

export default Scroll;
