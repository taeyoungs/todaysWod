import React from 'react';
import T, { FontFamily } from 'components/atoms/T';
import Img from 'components/atoms/Img';
import Block from 'components/molecules/Block';
import PositionBlock from 'components/molecules/PositionBlock';
import { ColorPalette, ColorType } from 'models/color';

interface IProps {
  backgroundColor?: ColorType;
  color?: ColorType;
  width?: number;
  height?: number;
  size?: number;
}

const Logo: React.FC<IProps> = ({
  backgroundColor = ColorPalette.Main.BG,
  color = ColorPalette.Main.TXT,
  width = 60,
  height = 60,
  size = 24,
}) => {
  return (
    <Block backgroundColor={backgroundColor}>
      <Img
        width={width}
        height={height}
        sourceImg={require('assets/images/main_logo.png')}
      />
      <PositionBlock top={-10}>
        <T fontFamily={FontFamily.NANUM_BOLD} color={color} size={size}>
          오늘의 와드
        </T>
      </PositionBlock>
    </Block>
  );
};

export default Logo;
