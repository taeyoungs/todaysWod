import React from 'react';
import { IComponentProps } from 'models/common';
import { Ionicons } from '@expo/vector-icons';
import { ColorPalette } from 'models/color';
import { Platform } from 'react-native';

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  name: string;
}

const Icon: React.FC<IProps> = ({
  children,
  color = ColorPalette.Black.BLACK,
  size = 24,
  name,
}) => {
  return Platform.OS === 'ios' ? (
    <Ionicons name={`ios-${name}`} color={color} size={size} />
  ) : (
    <Ionicons name={`md-${name}`} color={color} size={size} />
  );
};

export default Icon;
