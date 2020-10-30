import React from 'react';
import styled from 'styled-components/native';
import { IComponentProps } from 'models/common';

export enum Position {
  RELATIVE = 'relative',
  ABSOLUTE = 'absolute',
}

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  position?: Position;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface IStyleProps {
  position?: Position;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

const V = styled.View<IStyleProps>`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
`;

const PositionBlock: React.FC<IProps> = ({
  children,
  position = Position.RELATIVE,
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
}) => {
  const styleProps = {
    position,
    top,
    left,
    right,
    bottom,
  };

  return <V {...styleProps}>{children}</V>;
};

export default PositionBlock;
