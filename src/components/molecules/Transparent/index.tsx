import { ColorPalette } from 'models/color';
import React from 'react';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
  children: React.ReactNode;
  back(): void;
}

const { width, height } = Dimensions.get('screen');

const Transparent: React.FC<IProps> = ({ back, children }) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={back}>
        <View
          style={{
            flex: 1,
            backgroundColor: ColorPalette.Black.LIGHT,
            opacity: 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: width,
            height: height,
          }}
        ></View>
      </TouchableWithoutFeedback>
      {children}
    </>
  );
};

export default Transparent;
