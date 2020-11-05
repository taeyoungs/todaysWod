import React from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';
import { IComponentProps } from 'models/common';

interface IProps extends IComponentProps {
  width?: number;
  height?: number;
  sourceImg?: ImageSourcePropType;
}

const Image = styled.Image``;

const Img: React.FC<IProps> = ({ width = 40, height = 40, sourceImg = 1 }) => {
  const styleProps = {
    width,
    height,
  };
  return <Image style={{ ...styleProps }} source={sourceImg} />;
};

export default Img;
