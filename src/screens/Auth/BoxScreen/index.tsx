import React from 'react';
import Btn from 'components/atoms/Button';
import T, { FontFamily } from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import useUserActions from 'hooks/useUserActions';
import { ColorPalette } from 'models/color';
import useUserRetrieve from 'hooks/useUserRetrieve';
import Scroll from 'components/molecules/Scroll';
import Block, { Sort } from 'components/molecules/Block';
import Icon from 'components/atoms/Icon';
import { useNavigation } from '@react-navigation/native';
import { BoxScreenProps } from 'models/types';

interface IProps {}

const BoxScreen: React.FC<IProps> = () => {
  const { onLogOut } = useUserActions();
  const navigation = useNavigation<BoxScreenProps['navigation']>();
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
        <Flex backgroundColor={ColorPalette.White.TANSPARENT}>
          <Block>
            <Icon
              name="help-circle-outline"
              color={ColorPalette.Main.TXT_LIGHT}
              size={40}
            />
            <T
              color={ColorPalette.Main.TXT_LIGHT}
              size={18}
              margin={[10, 0, 30, 0]}
            >
              등록된 박스가 없습니다.
            </T>
          </Block>
          <Block backgroundColor={ColorPalette.Main.TXT} borderRadius={[10]}>
            <Btn
              onPress={() => navigation.navigate('BoxEnrollScreen')}
              padding={[15, 25]}
            >
              <T
                color={ColorPalette.Main.BG_DARK}
                fontFamily={FontFamily.NANUM_BOLD}
              >
                등록하러 가기
              </T>
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
