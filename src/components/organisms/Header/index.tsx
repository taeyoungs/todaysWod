import React from 'react';
import Btn from 'components/atoms/Button';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import useUserActions from 'hooks/useUserActions';
import { ColorPalette } from 'models/color';
import useUserRetrieve from 'hooks/useUserRetrieve';
import Scroll from 'components/molecules/Scroll';
import Block, {
  BorderStyle,
  FlexDirection,
  Sort,
} from 'components/molecules/Block';
import Logo from 'components/organisms/Logo';
import Img from 'components/atoms/Img';
import Icon from 'components/atoms/Icon';

interface IProps {}

const BoxScreen: React.FC<IProps> = () => {
  const { onLogOut } = useUserActions();
  // const info = useUserRetrieve();
  return (
    <Scroll padding={[0, 15]}>
      <Block margin={[60, 0, 30, 0]} padding={[0, 20]} sort={Sort.LEFT_CENTER}>
        <T
          color={ColorPalette.Main.TXT}
          size={22}
          margin={[0, 0, 10, 0]}
          fontFamily={FontFamily.NANUM_BOLD}
        >
          박스 등록
        </T>
        <T color={ColorPalette.Main.TXT_LIGHT} size={12}>
          현재 다니고 계신 혹은 다니실 예정인 크로스핏 박스를 등록해 주세요.
          박스 회원권 등록 후 메인 화면으로 이동합니다.
        </T>
      </Block>
      <Flex
        flex={5}
        backgroundColor={ColorPalette.White.WHITE}
        width={'100%'}
        borderRadius={[50]}
        padding={[0, 30]}
      >
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
                크로스핏 강남
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
              서울특별시 강남구 논현동 19-2 성현빌딩 B1
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
                02-516-6744
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
                06:30 ~ 23:00
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
                @cfgn_nh
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
                crossfitgn
              </T>
            </Flex>
          </Block>
          <Block width={'100%'} borderRadius={[20]}>
            <Btn
              onPress={() => console.log('버튼')}
              backgroundColor={ColorPalette.Main.TXT}
              padding={[10, 0]}
            >
              <T align={TextAlign.CENTER}>회원권 등록 대기 중</T>
            </Btn>
          </Block>
        </Flex>
      </Flex>
      <Flex flex={0.7}>
        <Btn onPress={onLogOut}>
          <T>로그아웃</T>
        </Btn>
      </Flex>
    </Scroll>
  );
};

export default BoxScreen;
