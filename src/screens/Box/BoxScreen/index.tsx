import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Btn from 'components/atoms/Button';
import T, { FontFamily } from 'components/atoms/T';
import Icon from 'components/atoms/Icon';
import Flex from 'components/molecules/Flex';
import Scroll from 'components/molecules/Scroll';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import BoxInfo from 'components/organisms/BoxInfo';
import useUserActions from 'hooks/useUserActions';
import useUserRetrieve from 'hooks/useUserRetrieve';
import useUser from 'hooks/useUser';
import { BoxScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';
import { createTwoButtonAlert, wait } from 'utils';
import api from 'api';

interface IProps {
  navigation: BoxScreenProps['navigation'];
  route: BoxScreenProps['route'];
}

const BoxScreen: React.FC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [fakeClock, setFakeClock] = useState(false);
  const { onLogOut, onSetUser } = useUserActions();
  useUserRetrieve(fakeClock);
  const { user, userId, token } = useUser();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(300).then(() => {
      setRefreshing(false);
      setFakeClock((prevState) => !prevState);
    });
  }, []);

  const revokeBox = async () => {
    try {
      await api.revokeBox(userId, token).then((res) => onSetUser(res.data));
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Scroll padding={[0, 15]} refreshing={refreshing} onRefresh={onRefresh}>
      <StatusBar barStyle="light-content" />
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
        borderRadius={[20]}
        padding={[0, 30]}
      >
        {user && user.box ? (
          <BoxInfo box={user.box} />
        ) : (
          <Flex backgroundColor={ColorPalette.White.TANSPARENT}>
            <Block>
              <Icon
                name="help-circle-outline"
                color={ColorPalette.Gray.GRAY}
                size={35}
              />
              <T
                color={ColorPalette.Gray.GRAY}
                size={14}
                margin={[10, 0, 30, 0]}
              >
                등록된 박스가 없습니다.
              </T>
            </Block>
            <Block backgroundColor={ColorPalette.Main.BG} borderRadius={[50]}>
              <Btn
                onPress={() => navigation.navigate('BoxEnroll')}
                padding={[15, 60]}
              >
                <T color={ColorPalette.White.WHITE}>등록하러 가기</T>
              </Btn>
            </Block>
          </Flex>
        )}
      </Flex>
      <Flex
        flex={0.8}
        flexDirection={FlexDirection.ROW}
        width={'100%'}
        sort={Sort.SPACE_AROUND_CENTER}
      >
        <Block>
          <Btn
            onPress={() =>
              createTwoButtonAlert(
                revokeBox,
                '박스 등록을 취소하시겠습니까?',
                `확인을 누르시면 현재 등록한 박스가 삭제됩니다.
(박스에 전송된 등록 요청 또한 삭제됩니다.)`,
                '취소',
                '확인'
              )
            }
          >
            <T color={ColorPalette.Main.TXT_LIGHT}>박스 삭제</T>
          </Btn>
        </Block>
        <Block>
          <TouchableWithoutFeedback onPress={onLogOut}>
            <T color={ColorPalette.Main.TXT_LIGHT}>로그아웃</T>
          </TouchableWithoutFeedback>
        </Block>
      </Flex>
    </Scroll>
  );
};

export default BoxScreen;
