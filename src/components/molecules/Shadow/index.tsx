import React from 'react';
import { View } from 'react-native';

interface IProps {
  children: React.ReactNode;
  width?: string | number;
  shadowColor?: string;
  shadowOffsetWidth?: number;
  shadowOffsetHeight?: number;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

const Shadow: React.FC<IProps> = ({
  children,
  width = '100%',
  shadowColor = '#000',
  shadowOffsetWidth = 2,
  shadowOffsetHeight = 2,
  shadowOpacity = 0.23,
  shadowRadius = 2.62,
  elevation = 4,
}) => {
  return (
    <View
      style={{
        width,
        shadowColor,
        shadowOffset: {
          width: shadowOffsetWidth,
          height: shadowOffsetHeight,
        },
        shadowOpacity,
        shadowRadius,
        elevation,
        marginBottom: 10,
      }}
    >
      {children}
    </View>
  );
};

export default Shadow;
