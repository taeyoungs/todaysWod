import React, { useLayoutEffect, useState } from 'react';
import T, { FontFamily } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Scroll from 'components/molecules/Scroll';
import Flex from 'components/molecules/Flex';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import OpacityHeader from 'components/organisms/OpacityHeader';
import Ticket from 'components/organisms/Ticket';
import useMonthRecords from 'hooks/useMonthRecords';
import useReservations from 'hooks/useReservations';
import { HomeScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';
import { isPassDate } from 'utils';
import useReservationActions from 'hooks/useReservationActions';

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

const Record: React.FC<IProps> = ({ navigation }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  useMonthRecords(year, month, false);
  const reservations = useReservations();
  const thisMonth = new Date().getMonth() + 1;

  // console.log(reservations, getPastReservationPage());

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ scene }) => (
        <OpacityHeader
          title="수강 내역"
          iconName="folder-open"
          scene={scene}
          back={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
    } else {
      setMonth((prevState) => prevState + 1);
    }
  };

  const beforeMonth = () => {
    if (month === 1) {
      setYear((prevState) => prevState - 1);
      setMonth(12);
    } else {
      setMonth((prevState) => prevState - 1);
    }
  };

  return (
    <>
      <Flex
        backgroundColor={ColorPalette.White.SMOKE}
        sort={Sort.CENTER_TOP}
        margin={[65, 0, 0, 0]}
      >
        <Block
          backgroundColor={ColorPalette.White.WHITE}
          width={'100%'}
          height={'60px'}
        >
          <Block
            flexDirection={FlexDirection.ROW}
            width={'100%'}
            sort={Sort.SPACE_AROUND_CENTER}
          >
            {month !== thisMonth - 6 ? (
              <Block>
                <Btn onPress={beforeMonth}>
                  <Icon
                    name="arrow-dropleft"
                    size={22}
                    color={ColorPalette.Main.BG_DARK}
                  />
                </Btn>
              </Block>
            ) : (
              <Block width={'20px'}></Block>
            )}
            <T size={14} color={ColorPalette.Main.BG}>
              {month}월 {year}년
            </T>
            {month !== thisMonth ? (
              <Block>
                <Btn onPress={nextMonth}>
                  <Icon
                    name="arrow-dropright"
                    size={22}
                    color={ColorPalette.Main.BG_DARK}
                  />
                </Btn>
              </Block>
            ) : (
              <Block width={'20px'}></Block>
            )}
          </Block>
        </Block>
        <Block
          flexDirection={FlexDirection.ROW}
          width={'100%'}
          sort={Sort.SPACE_AROUND_CENTER}
          margin={[20, 0]}
        >
          <Block flexDirection={FlexDirection.ROW}>
            <T
              size={12}
              color={ColorPalette.Main.TXT}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              예약:{' '}
            </T>
            <T size={12}>
              {reservations.filter((r) => !isPassDate(r.date)).length}
            </T>
          </Block>
          <Block flexDirection={FlexDirection.ROW}>
            <T
              size={12}
              color={ColorPalette.Main.BG}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              출석:{' '}
            </T>
            <T size={12}>
              {reservations.filter((r) => r.state === 'confirmed').length}
            </T>
          </Block>
          <Block flexDirection={FlexDirection.ROW}>
            <T
              size={12}
              color={ColorPalette.Red.RED}
              fontFamily={FontFamily.NANUM_BOLD}
            >
              결석:{' '}
            </T>
            <T size={12}>
              {reservations.filter((r) => r.state === 'canceled').length}
            </T>
          </Block>
        </Block>
        <Scroll backgroundColor={ColorPalette.White.SMOKE} padding={[0, 20]}>
          {reservations
            .filter((reservation) => !isPassDate(reservation.date))
            .map((reservation) => (
              <Ticket
                reservation={reservation}
                calendar={false}
                key={reservation.id}
              />
            ))}
          <Block margin={[0, 0, 10, 0]}>
            <Btn onPress={() => console.log('더 불러오기')}>
              <T>더 불러오기</T>
            </Btn>
          </Block>
        </Scroll>
      </Flex>
    </>
  );
};

export default Record;
