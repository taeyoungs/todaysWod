import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Scroll from 'components/molecules/Scroll';
import Flex from 'components/molecules/Flex';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import OpacityHeader from 'components/organisms/OpacityHeader';
import Ticket from 'components/organisms/Ticket';
import useMonthRecords from 'hooks/useMonthRecords';
import usePastReservations from 'hooks/usePastReservations';
import useReservationActions from 'hooks/useReservationActions';
import { HomeScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';
import { isPassDate } from 'utils';

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

const Record: React.FC<IProps> = ({ navigation }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);
  useMonthRecords(year, month, false, setLoading);
  const {
    records,
    canceledCnt,
    confirmCnt,
    recordsCnt,
    hasMore,
  } = usePastReservations(month);
  const { onIncreasePage } = useReservationActions();
  const thisMonth = new Date().getMonth() + 1;

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
      setYear((prevState) => prevState + 1);
      setMonth(1);
    } else {
      setMonth((prevState) => prevState + 1);
    }
    setLoading(true);
  };

  const beforeMonth = () => {
    if (month === 1) {
      setYear((prevState) => prevState - 1);
      setMonth(12);
    } else {
      setMonth((prevState) => prevState - 1);
    }
    setLoading(true);
  };

  const Cnt = ({
    color,
    title,
    count,
  }: {
    color: string;
    title: string;
    count: number;
  }) => {
    return (
      <Block flexDirection={FlexDirection.ROW}>
        <T size={12} color={color} fontFamily={FontFamily.NANUM_BOLD}>
          {title}{' '}
        </T>
        <T size={12}>{count}</T>
      </Block>
    );
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
          <Cnt color={ColorPalette.Main.TXT} title="예약:" count={recordsCnt} />
          <Cnt color={ColorPalette.Main.BG} title="출석:" count={confirmCnt} />
          <Cnt color={ColorPalette.Red.RED} title="결석:" count={canceledCnt} />
        </Block>
        <Scroll backgroundColor={ColorPalette.White.SMOKE} padding={[0, 20]}>
          {loading ? (
            <Flex backgroundColor={ColorPalette.White.TANSPARENT}>
              <ActivityIndicator color={ColorPalette.Main.BG_DARK} />
            </Flex>
          ) : (
            <>
              {records.map((reservation) => (
                <Ticket
                  reservation={reservation}
                  calendar={false}
                  key={reservation.id}
                />
              ))}
              {hasMore && (
                <Block margin={[0, 0, 20, 0]}>
                  <Block
                    backgroundColor={ColorPalette.Main.TXT_LIGHT}
                    width={'120px'}
                    padding={[5, 0]}
                    borderRadius={[2]}
                  >
                    <Btn onPress={onIncreasePage}>
                      <T
                        align={TextAlign.CENTER}
                        color={ColorPalette.White.WHITE}
                        size={12}
                      >
                        더 불러오기
                      </T>
                    </Btn>
                  </Block>
                </Block>
              )}
            </>
          )}
        </Scroll>
      </Flex>
    </>
  );
};

export default Record;
