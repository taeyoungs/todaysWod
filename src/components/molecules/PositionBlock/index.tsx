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
  ${(props) => props.top && `top: ${props.top}px;`};
  ${(props) => props.left && `left: ${props.left}px;`};
  ${(props) => props.right && `right: ${props.right}px;`};
  ${(props) => props.bottom && `bottom: ${props.bottom}px;`};
`;

const PositionBlock: React.FC<IProps> = ({
  children,
  position = Position.RELATIVE,
  top,
  left,
  right,
  bottom,
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
