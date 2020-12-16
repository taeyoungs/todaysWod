import React from 'react';
import Btn from 'components/atoms/Button';
import Img from 'components/atoms/Img';
import Icon from 'components/atoms/Icon';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import { IBoxProps } from 'models/common';
import * as Linking from 'expo-linking';

interface IProps {
  phone?: string;
  time?: string;
  insta?: string;
  facebook?: string;
  box: IBoxProps;
}

const BoxInfo: React.FC<IProps> = ({
  box,
  phone = '02-516-6744',
  time = '06:30 ~ 23:00',
  insta = 'cfgn_nh',
  facebook = 'crossftgn',
}) => {
  const OptionBox = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    return (
      <>
        <T color={ColorPalette.Gray.GRAY} size={11} margin={[0, 0, 10, 0]}>
          {title}
        </T>
        <T color={ColorPalette.Black.BLACK}>{content}</T>
      </>
    );
  };

  return (
    <>
      <Flex
        flexDirection={FlexDirection.ROW}
        backgroundColor={ColorPalette.White.TANSPARENT}
        borderColor={ColorPalette.Gray.GAINSBORO}
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
            <Icon name="body" color={ColorPalette.Black.BLACK} />
            <Block>
              <T color={ColorPalette.Black.BLACK}>CrossFit</T>
              <T color={ColorPalette.Black.BLACK}>GANGNAM</T>
            </Block>
          </Block>
          <Block margin={[20, 0, 10, 0]}>
            <Img
              sourceImg={require('assets/images/light_dbell.png')}
              width={15}
              height={15}
            />
          </Block>
          <Block sort={Sort.LEFT_CENTER}>
            <T color={ColorPalette.Gray.GRAY} size={11} margin={[0, 0, 5, 0]}>
              이름
            </T>
            <T
              color={ColorPalette.Black.BLACK}
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
        flex={1.3}
      >
        <Block
          sort={Sort.LEFT_CENTER}
          backgroundColor={ColorPalette.White.WHITE}
          width={'100%'}
        >
          <OptionBox title="주소" content={box?.address} />
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
            <OptionBox title="전화번호" content={phone} />
          </Flex>
          <Flex
            sort={Sort.LEFT_CENTER}
            backgroundColor={ColorPalette.White.WHITE}
          >
            <OptionBox title="운영시간" content={time} />
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
            <Btn
              onPress={() =>
                Linking.openURL(`instagram://user?username=${insta}`)
              }
            >
              <OptionBox title="인스타그램" content={insta} />
            </Btn>
          </Flex>
          <Flex
            sort={Sort.LEFT_CENTER}
            backgroundColor={ColorPalette.White.WHITE}
          >
            <OptionBox title="페이스북" content={facebook} />
          </Flex>
        </Block>
        <Block width={'100%'} borderRadius={[50]}>
          <Btn
            onPress={() => console.log('버튼')}
            backgroundColor={ColorPalette.Main.BG}
            padding={[10, 0]}
          >
            <T align={TextAlign.CENTER} color={ColorPalette.White.WHITE}>
              회원권 등록 대기 중
            </T>
          </Btn>
        </Block>
      </Flex>
    </>
  );
};

export default BoxInfo;
