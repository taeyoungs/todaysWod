import React from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

const KeyboardDismiss: React.FC<IProps> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismiss;
