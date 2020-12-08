import React from 'react';
import { Dimensions } from 'react-native';
import T from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Flex from 'components/molecules/Flex';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Header from 'components/organisms/Header';
import useUserActions from 'hooks/useUserActions';
import useUser from 'hooks/useUser';
import { ColorPalette } from 'models/color';
import { HomeScreenProps } from 'models/types';
import { createTwoButtonAlert } from 'utils';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

const Profile: React.FC<IProps> = ({ navigation }) => {
  const { onLogOut } = useUserActions();
  const { user } = useUser();

  const OptionBox = ({
    onPress,
    label,
    iconName,
  }: {
    onPress: () => void;
    label: string;
    iconName: string;
  }) => {
    return (
      <Btn onPress={onPress}>
        <Block
          flexDirection={FlexDirection.ROW}
          sort={Sort.SPACE_BETWEEN_CENTER}
          padding={[15, 0]}
          width={'100%'}
          border={[0, 0, 1, 0]}
          borderColor={ColorPalette.Gray.GAINSBORO}
        >
          <T color={ColorPalette.Gray.GRAY} size={16}>
            {label}
          </T>
          <Icon name={iconName} color={ColorPalette.Gray.GRAY} />
        </Block>
      </Btn>
    );
  };

  return (
    <>
      <Header
        goMembership={() => navigation.navigate('Membership')}
        iconName="contact"
        title="프로필"
      />
      <Flex
        backgroundColor={ColorPalette.White.WHITE}
        sort={Sort.CENTER_SPACE_AROUND}
        padding={[0, 25]}
        width={`${width}px`}
      >
        <Block
          flexDirection={FlexDirection.ROW}
          sort={Sort.LEFT_BOTTOM}
          margin={[40, 0, 20, 0]}
          width={'100%'}
          padding={[0, 10]}
        >
          <T size={30}>{user && user.last_name}</T>
          <T size={22} color={ColorPalette.Gray.GRAY}>
            님
          </T>
        </Block>
        <Block width={'100%'} margin={[0, 0, 40, 0]}>
          <OptionBox
            iconName="person"
            label="개인 정보"
            onPress={() => console.log('개인정보')}
          />
          <OptionBox
            iconName="folder-open"
            label="수강 내역"
            onPress={() => navigation.navigate('Record')}
          />
          <OptionBox
            iconName="build"
            label="박스 변경"
            onPress={() => console.log('개인정보')}
          />
          <OptionBox
            iconName="log-out"
            label="로그아웃"
            onPress={() =>
              createTwoButtonAlert(
                () => onLogOut(),
                '정말 로그아웃 하시겠습니까?',
                ''
              )
            }
          />
        </Block>
        <Block></Block>
      </Flex>
      <Block
        height={'50px'}
        width={'100%'}
        backgroundColor={ColorPalette.White.SMOKE}
        border={[1, 0, 0, 0]}
        borderColor={ColorPalette.Gray.GAINSBORO}
      >
        <T color={ColorPalette.Gray.GRAY} size={10}>
          Copyright Youngslog in Bundang, All Rights Reserved.
        </T>
      </Block>
    </>
  );
};

export default Profile;
