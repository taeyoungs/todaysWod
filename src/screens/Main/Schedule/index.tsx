import React, { useLayoutEffect, useState } from 'react';
import T from 'components/atoms/T';
import Icon from 'components/atoms/Icon';
import Btn from 'components/atoms/Button';
import Flex from 'components/molecules/Flex';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Scroll from 'components/molecules/Scroll';
import ScheduleItem from 'components/organisms/ScheduleItem';
import useSchedules from 'hooks/useSchedules';
import { ColorPalette } from 'models/color';
import { ScheduleScreenProps } from 'models/types';
import { IScheduleProps } from 'models/common';
import { wait } from 'utils';

interface IProps {
  navigation: ScheduleScreenProps['navigation'];
  route: ScheduleScreenProps['route'];
}

const Schedule: React.FC<IProps> = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const schedules = useSchedules(route.params.date, refreshing);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { backgroundColor: 'transparent' },
      cardOverlayEnabled: true,
    });
  }, []);
  const d = route.params.date.split('-');
  const goCheck = (date: string, schedule: IScheduleProps) =>
    navigation.navigate('Check', { date, schedule });
  return (
    <>
      <Flex
        backgroundColor={ColorPalette.White.TANSPARENT}
        padding={[60, 0, 0, 0]}
      >
        <Flex
          padding={[5, 0, 0, 0]}
          width={'100%'}
          borderRadius={[40, 0]}
          backgroundColor={ColorPalette.White.WHITE}
          sort={Sort.CENTER_TOP}
        >
          <Block
            width={'30px'}
            height={'5px'}
            margin={[0, 0, 50, 0]}
            borderRadius={[5]}
            backgroundColor={ColorPalette.Main.BG}
          ></Block>

          <Scroll
            backgroundColor={ColorPalette.White.SMOKE}
            refreshColor={ColorPalette.Main.BG}
            refreshing={refreshing}
            onRefresh={onRefresh}
          >
            <Block
              height={'50px'}
              width={'100%'}
              flexDirection={FlexDirection.ROW}
              sort={Sort.SPACE_BETWEEN_CENTER}
              padding={[0, 30]}
            >
              <Block>
                <T>
                  {d[0]}년 {d[1]}월 {d[2]}일
                </T>
              </Block>
              <Block>
                <Btn
                  onPress={() =>
                    navigation.navigate('Wod', { date: route.params.date })
                  }
                >
                  <Block flexDirection={FlexDirection.ROW}>
                    <T margin={[0, 5]}>와드</T>
                    <Icon name="help-circle-outline" size={18} />
                  </Block>
                </Btn>
              </Block>
            </Block>
            {schedules &&
              schedules.map((schedule) => (
                <ScheduleItem
                  schedule={schedule}
                  key={schedule.id}
                  date={route.params.date}
                  goCheck={goCheck}
                />
              ))}
          </Scroll>
        </Flex>
      </Flex>
    </>
  );
};

export default Schedule;
