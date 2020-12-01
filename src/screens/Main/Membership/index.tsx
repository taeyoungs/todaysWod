import React, { useLayoutEffect } from 'react';
import { Dimensions } from 'react-native';
import T from 'components/atoms/T';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Transparent from 'components/molecules/Transparent';
import useMemebership from 'hooks/useMembership';
import { ColorPalette, ColorType } from 'models/color';
import { MemberScreenProps } from 'models/types';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: MemberScreenProps['navigation'];
}

const Membership: React.FC<IProps> = ({ navigation }) => {
  const membership = useMemebership();
  // console.log(membership);

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { backgroundColor: 'transparent' },
      cardOverlayEnabled: true,
    });
  }, []);

  function formatD(date: string, full: boolean): string {
    const d = date.split('-');
    if (full) {
      return `${d[0]}년 ${d[1]}월 ${d[2]}일`;
    } else {
      return `${d[1]}/${d[2]}`;
    }
  }

  const OptionBox = (label: string, content: string | number) => {
    return (
      <Block
        flexDirection={FlexDirection.ROW}
        sort={Sort.SPACE_BETWEEN_CENTER}
        width={'100%'}
        margin={[0, 0, 15, 0]}
        padding={[0, 0, 15, 0]}
        border={[0, 0, 1, 0]}
        borderColor={ColorPalette.Gray.GAINSBORO}
      >
        <T color={ColorPalette.Gray.GRAY}>{label}</T>
        <T>{content}</T>
      </Block>
    );
  };

  const formatState = (date: string) => {
    const today = new Date().getTime();
    const endDate = new Date(date).getTime();
    const oneDay = 3600 * 1000 * 24;
    const remainDays = Math.ceil((endDate - today) / oneDay);
    let color: ColorType;
    let title: string;

    if (remainDays > 3 && remainDays <= 7) {
      color = ColorPalette.Main.TXT;
      title = `만료 ${remainDays}일전`;
    } else if (remainDays <= 3) {
      color = ColorPalette.Red.RED;
      title = `만료 ${remainDays}일전`;
    } else {
      color = ColorPalette.Main.BG;
      title = `이용중`;
    }

    return (
      <Block
        backgroundColor={color}
        margin={[0, 10]}
        padding={[2, 5]}
        borderRadius={[20]}
      >
        <T size={10} color={ColorPalette.White.WHITE}>
          {title}
        </T>
      </Block>
    );
  };

  return (
    <Transparent back={() => navigation.goBack()}>
      <Block
        backgroundColor={ColorPalette.White.WHITE}
        width={`${width - 20}px`}
        height={'75%'}
        margin={[80, 10, 0, 10]}
      >
        <T margin={[0, 0, 10, 0]} size={26}>
          회원권
        </T>
        <Block flexDirection={FlexDirection.ROW}>
          <T color={ColorPalette.Gray.GRAY} size={12}>
            크로스핏 강남
          </T>
          {membership.end_term && formatState(membership.end_term)}
          {membership.cnt && (
            <Block
              backgroundColor={ColorPalette.Main.BG}
              margin={[0, 10]}
              padding={[2, 5]}
              borderRadius={[20]}
            >
              <T size={10} color={ColorPalette.White.WHITE}>
                이용중
              </T>
            </Block>
          )}
        </Block>
        <Block margin={[30, 0, 0, 0]} padding={[0, 40]} width={'100%'}>
          {membership.user && OptionBox('이름', membership.user.last_name)}
          {membership.title &&
            OptionBox('종류', membership.title === 'term' ? '기간' : '횟수')}
          {membership.start_term &&
            OptionBox('시작일', formatD(membership.start_term, true))}
          {membership.end_term &&
            OptionBox('종료일', formatD(membership.end_term, true))}
          {membership.cnt && OptionBox('남은 횟수', `${membership.cnt}회`)}
          {OptionBox(
            '홀딩',
            membership.hold_start && membership.hold_date
              ? `${formatD(membership.hold_start, false)} - ${formatD(
                  membership.hold_date,
                  false
                )}`
              : '-'
          )}
          <T margin={[10, 0, 20, 0]} size={18}>
            옵션
          </T>
          <Block width={'100%'} padding={[0, 0, 15, 0]}>
            <Block
              flexDirection={FlexDirection.ROW}
              sort={Sort.SPACE_BETWEEN_CENTER}
              width={'100%'}
              margin={[0, 0, 15, 0]}
            >
              <T color={ColorPalette.Gray.GRAY}>락커</T>
              <T>12/01 - 12/31</T>
            </Block>
            <Block
              flexDirection={FlexDirection.ROW}
              sort={Sort.SPACE_BETWEEN_CENTER}
              width={'100%'}
            >
              <T color={ColorPalette.Gray.GRAY}>옷</T>
              <T>12/01 - 12/31</T>
            </Block>
          </Block>
        </Block>
      </Block>
    </Transparent>
  );
};

export default Membership;
