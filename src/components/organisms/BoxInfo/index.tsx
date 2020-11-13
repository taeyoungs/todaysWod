import React from 'react';
import Btn from 'components/atoms/Button';
import Img from 'components/atoms/Img';
import Icon from 'components/atoms/Icon';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import { IUserProps } from 'models/common';

interface IProps {
  name?: string;
  address?: string;
  phone?: string;
  time?: string;
  insta?: string;
  facebook?: string;
  box: IUserProps['box'];
}

const BoxInfo: React.FC<IProps> = ({
  box,
  phone = '02-516-6744',
  time = '06:30 ~ 23:00',
  insta = '@cfgn_nh',
  facebook = 'crossftgn',
}) => {
  return (
    <>
      <Flex
        flexDirection={FlexDirection.ROW}
        backgroundColor={ColorPalette.White.TANSPARENT}
        border={[0, 0, 2, 0]}
        borderColor={ColorPalette.White.SMOKE}
        width={'100%'}
        flex={0.5}
      >
        <Block
          backgroundColor={ColorPalette.White.TANSPARENT}
          sort={Sort.CENTER_SPACE_AROUND}
          height={'70%'}
          margin={[0, 20, 0, 0]}
        >
          <Block flexDirection={FlexDirection.ROW}>
            <Icon name="body" color={ColorPalette.Main.BG_DARK} />
            <Block>
              <T color={ColorPalette.Main.BG_DARK}>CrossFit</T>
              <T color={ColorPalette.Main.BG_DARK}>GANGNAM</T>
            </Block>
          </Block>
          <Block margin={[10, 0]}>
            <Img
              sourceImg={require('assets/images/light_dbell.png')}
              width={15}
              height={15}
            />
          </Block>
          <Block sort={Sort.LEFT_CENTER}>
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={11}
              margin={[0, 0, 5, 0]}
            >
              이름
            </T>
            <T
              color={ColorPalette.Main.BG_DARK}
              size={20}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              {box?.name}
            </T>
          </Block>
        </Block>
        <Img
          sourceImg={require('assets/images/seoulmap.png')}
          width={130}
          height={130}
        />
      </Flex>
      <Flex
        backgroundColor={ColorPalette.White.WHITE}
        sort={Sort.CENTER_SPACE_AROUND}
        width={'100%'}
        borderRadius={[0, 50]}
      >
        <Block
          sort={Sort.LEFT_CENTER}
          backgroundColor={ColorPalette.White.WHITE}
          width={'100%'}
        >
          <T
            color={ColorPalette.Main.TXT_LIGHT}
            size={11}
            margin={[0, 0, 5, 0]}
          >
            주소
          </T>
          <T
            color={ColorPalette.Main.BG_DARK}
            fontFamily={FontFamily.NANUM_BOLD}
          >
            {box?.address}
          </T>
        </Block>
        <Block
          flexDirection={FlexDirection.ROW}
          sort={Sort.SPACE_AROUND_CENTER}
          backgroundColor={ColorPalette.White.BEIGE}
          width={'100%'}
        >
          <Flex
            sort={Sort.LEFT_CENTER}
            backgroundColor={ColorPalette.White.WHITE}
          >
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={11}
              margin={[0, 0, 5, 0]}
            >
              전화번호
            </T>
            <T
              color={ColorPalette.Main.BG_DARK}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              {phone}
            </T>
          </Flex>
          <Flex
            sort={Sort.LEFT_CENTER}
            backgroundColor={ColorPalette.White.WHITE}
          >
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={11}
              margin={[0, 0, 5, 0]}
            >
              운영 시간
            </T>
            <T
              color={ColorPalette.Main.BG_DARK}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              {time}
            </T>
          </Flex>
        </Block>
        <Block
          flexDirection={FlexDirection.ROW}
          sort={Sort.SPACE_AROUND_CENTER}
          width={'100%'}
        >
          <Flex
            sort={Sort.LEFT_CENTER}
            backgroundColor={ColorPalette.White.WHITE}
          >
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={11}
              margin={[0, 0, 5, 0]}
            >
              인스타그램
            </T>
            <T
              color={ColorPalette.Main.BG_DARK}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              {insta}
            </T>
          </Flex>
          <Flex
            sort={Sort.LEFT_CENTER}
            backgroundColor={ColorPalette.White.WHITE}
          >
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={11}
              margin={[0, 0, 5, 0]}
            >
              페이스북
            </T>
            <T
              color={ColorPalette.Main.BG_DARK}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              {facebook}
            </T>
          </Flex>
        </Block>
        <Block width={'100%'} borderRadius={[20]}>
          <Btn
            onPress={() => console.log('버튼')}
            backgroundColor={ColorPalette.Main.TXT}
            padding={[10, 0]}
          >
            <T align={TextAlign.CENTER} color={ColorPalette.Main.BG}>
              회원권 등록 대기 중
            </T>
          </Btn>
        </Block>
      </Flex>
    </>
  );
};

export default BoxInfo;
