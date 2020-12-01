import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import T, { FontFamily } from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import Scroll from 'components/molecules/Scroll';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Ticket from 'components/organisms/Ticket';
import useMonthRecords from 'hooks/useMonthRecords';
import useExistWods from 'hooks/useExistWods';
import useReservationActions from 'hooks/useReservationActions';
import useReservations from 'hooks/useReservations';
import { ColorPalette } from 'models/color';
import { lconfig } from 'models/cal';
import { HomeScreenProps } from 'models/types';
import { daysInMonth, isPassDate, wait } from 'utils';
import Header from 'components/organisms/Header';

LocaleConfig.locales['kr'] = lconfig;
LocaleConfig.defaultLocale = 'kr';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

interface IOptionProps {
  text: string;
  color: string;
}

const Reservation: React.FC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const records = useMonthRecords(year, month);
  const existWods = useExistWods(year, month, refreshing);
  const { onSetReservations } = useReservationActions();
  const reservations = useReservations(month);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    // 이번 달 이전의 예약 목록은 저장하지 않음 => X 다시 저장하는 걸로 변경
    // const thisMonth = new Date().getMonth() + 1;
    // if (thisMonth <= month) {
    //   const reservations = records.filter((value) => isPassDate(value.date));
    // }
    onSetReservations({ month, reservations: records });
  }, [records]);

  const markList = () => {
    const objRecords: Record<string, Record<string, string | boolean>> = {};

    for (let index = 1; index <= daysInMonth(month - 1, year); index++) {
      const formatMonth = month < 10 ? `0${month}` : month;
      if (index < 10) {
        objRecords[`${year}-${formatMonth}-0${index}`] = { disabled: true };
      } else {
        objRecords[`${year}-${formatMonth}-${index}`] = { disabled: true };
      }
    }

    existWods.forEach((wod) => {
      if (wod.title.name != 'rest') {
        objRecords[wod.date] = { disabled: false };
      }
    });

    reservations &&
      reservations.forEach((reservation) => {
        const dotColor =
          reservation.state === 'pending'
            ? ColorPalette.Main.TXT
            : reservation.state === 'confirmed'
            ? ColorPalette.Main.BG_DARK
            : ColorPalette.Red.RED;
        objRecords[reservation.date] &&
          Object.assign(objRecords[reservation.date], {
            marked: true,
            dotColor,
          });
      });

    return objRecords;
  };

  const dotOptions = [
    { text: '예약 완료', color: ColorPalette.Main.TXT },
    { text: '출석', color: ColorPalette.Main.BG_DARK },
    { text: '결석', color: ColorPalette.Red.RED },
  ];

  const DotOption = ({ text, color }: IOptionProps) => {
    return (
      <Block flexDirection={FlexDirection.ROW}>
        <T color={color} size={24}>
          •
        </T>
        <T size={12}>{text}</T>
      </Block>
    );
  };

  return (
    <>
      <Header goMembership={() => navigation.navigate('Membership')} />
      <Scroll refreshing={refreshing} onRefresh={onRefresh}>
        <Flex
          backgroundColor={ColorPalette.White.WHITE}
          width={'100%'}
          borderRadius={[40, 0]}
          sort={Sort.CENTER_TOP}
          padding={[40, 0, 0, 0]}
          margin={[5, 0, 0, 0]}
        >
          <Block width={'100%'} margin={[0, 0, 2, 0]}>
            <Calendar
              style={{ width: width - 20 }}
              markingType="simple"
              markedDates={markList()}
              hideExtraDays={true}
              onDayPress={(day) => {
                navigation.navigate('Schedule', { date: `${day.dateString}` });
              }}
              onMonthChange={(month) => {
                setYear(month.year);
                setMonth(month.month);
              }}
              theme={{
                arrowColor: ColorPalette.Main.BG_DARK,
                dayTextColor: ColorPalette.Main.BG_DARK,
                todayTextColor: ColorPalette.Main.TXT,
                textDayFontFamily: FontFamily.NANUM_REGULAR,
                textMonthFontFamily: FontFamily.NANUM_REGULAR,
                textDayHeaderFontFamily: FontFamily.NANUM_REGULAR,
              }}
            />
          </Block>
          <Block
            flexDirection={FlexDirection.ROW}
            sort={Sort.SPACE_AROUND_CENTER}
            width={'100%'}
            height={'50px'}
            margin={[0, 0, 10, 0]}
          >
            <Block flexDirection={FlexDirection.ROW}>
              <T
                color={ColorPalette.Main.TXT_LIGHT}
                size={8}
                fontFamily={FontFamily.NANUM_BOLD}
                margin={[0, 10, 0, 0]}
              >
                T
              </T>
              <T size={12}>와드 미등록</T>
            </Block>
            {dotOptions.map((option, index) => (
              <DotOption text={option.text} key={index} color={option.color} />
            ))}
          </Block>
          <Flex
            padding={[0, 30]}
            width={'100%'}
            backgroundColor={ColorPalette.White.SMOKE}
            sort={Sort.CENTER_TOP}
          >
            <T size={13} margin={[15, 0]}>
              {month}월 예약
            </T>
            {reservations &&
              reservations
                .filter((value) => isPassDate(value.date))
                .map((reservation, index) => (
                  <Ticket key={index} reservation={reservation} />
                ))}
          </Flex>
        </Flex>
      </Scroll>
    </>
  );
};

export default Reservation;
