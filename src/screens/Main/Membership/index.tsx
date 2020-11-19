import React from 'react';
import { StatusBar } from 'react-native';
import T, { FontFamily } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Flex from 'components/molecules/Flex';
import InputBox from 'components/organisms/InputBox';
import useUserActions from 'hooks/useUserActions';
import useMemebership from 'hooks/useMembership';
import { ColorPalette } from 'models/color';
import Block, { Sort } from 'components/molecules/Block';

interface IProps {}

const Membership: React.FC<IProps> = () => {
  const { onLogOut } = useUserActions();
  const membership = useMemebership();
  //   console.log(membership);
  const OptionBox = (name: string, label: string, content: string | number) => {
    return (
      <InputBox name={name} label={label}>
        <T
          color={ColorPalette.White.WHITE}
          size={18}
          margin={[5, 0]}
          fontFamily={FontFamily.NANUM_BOLD}
        >
          {content}
        </T>
      </InputBox>
    );
  };

  return (
    <Flex backgroundColor={ColorPalette.White.TANSPARENT} width={'100%'}>
      <StatusBar barStyle="dark-content" />
      <Block
        margin={[70, 0, 10, 0]}
        sort={Sort.LEFT_CENTER}
        width={'100%'}
        padding={[0, 40]}
      >
        <T
          margin={[10, 0]}
          size={25}
          color={ColorPalette.Main.BG}
          fontFamily={FontFamily.NANUM_BOLD}
        >
          회원권 정보
        </T>
      </Block>
      <Flex width={'100%'} borderRadius={[50, 0]} padding={[0, 20]}>
        {membership.title &&
          OptionBox(
            'pricetags',
            '종류',
            membership.title === 'term' ? '기간제' : '횟수제'
          )}
        {membership.cnt && OptionBox('pricetags', '종류', membership.cnt)}
        {membership.start_term &&
          OptionBox('log-in', '시작일', membership.start_term)}
        {membership.end_term &&
          OptionBox('log-out', '종료일', membership.end_term)}
        {membership.hold_date &&
          OptionBox('battery-charging', '홀딩', membership.hold_date)}

        <Btn onPress={onLogOut}>
          <T>로그아웃</T>
        </Btn>
      </Flex>
    </Flex>
  );
};

export default Membership;
