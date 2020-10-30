import React from 'react';
import { IComponentProps } from 'models/common';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface IProps extends IComponentProps {
  children?: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

const Btn: React.FC<IProps> = ({ children, onPress }) => {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
};

export default Btn;
