import React from 'react';
import { Dimensions } from 'react-native';
import T, { FontFamily, TextTransform } from 'components/atoms/T';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import { IWodProps } from 'models/common';

const { width } = Dimensions.get('screen');

interface IProps {
  wod: IWodProps;
}

interface IOptionBoxProps {
  title: string;
  content: number;
}

const WodList: React.FC<IProps> = ({ wod }) => {
  const OptionBox = ({ title, content }: IOptionBoxProps) => (
    <Block>
      <T color={ColorPalette.Gray.GRAY} size={10}>
        {title}
      </T>
      <T size={16} fontFamily={FontFamily.NANUM_BOLD}>
        {content}
      </T>
    </Block>
  );

  return (
    <Block
      width={`${width - 40}px`}
      backgroundColor={ColorPalette.White.WHITE}
      borderRadius={[5]}
      margin={[0, 20]}
    >
      <Block backgroundColor={ColorPalette.White.WHITE} width={'100%'}>
        <T
          margin={[0, 0, 10, 0]}
          size={18}
          fontFamily={FontFamily.NANUM_BOLD}
          transform={TextTransform.UPPERCASE}
        >
          {wod.title.name}
        </T>
        <Block
          flexDirection={FlexDirection.ROW}
          sort={Sort.SPACE_AROUND_CENTER}
          width={'100%'}
        >
          {wod.rounds && <OptionBox title="ROUNDS" content={wod.rounds} />}
          {wod.time && <OptionBox title="TIME (min)" content={wod.time} />}
          {wod.round_sec && (
            <OptionBox title="WORK (sec)" content={wod.round_sec} />
          )}
          {wod.rest_sec && (
            <OptionBox title="REST (sec)" content={wod.rest_sec} />
          )}
          {wod.title.name === 'rest' && (
            <Block>
              <T color={ColorPalette.Gray.GRAY} size={10}>
                -
              </T>
              <T size={12} fontFamily={FontFamily.NANUM_BOLD}>
                🌙
              </T>
            </Block>
          )}
        </Block>
      </Block>
      <Block
        backgroundColor={ColorPalette.White.TANSPARENT}
        width={'100%'}
        padding={[0, 10]}
        height={'70%'}
      >
        <T size={16} lineHeight={22}>
          {wod.content}
        </T>
      </Block>
    </Block>
  );
};

// .replaceAll('\r\n\r\n', '\r\n')

export default WodList;
