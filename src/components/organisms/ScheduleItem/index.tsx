import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Btn from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import T, { FontFamily } from 'components/atoms/T';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Shadow from 'components/molecules/Shadow';
import { ColorPalette } from 'models/color';
import { IScheduleProps } from 'models/common';
import { formatTime, isPassDate } from 'utils';
import useReservationActions from 'hooks/useReservationActions';

interface IProps {
  schedule: IScheduleProps;
  date: string;
  goCheck: (date: string, schedule: IScheduleProps) => void;
}

const ScheduleItem: React.FC<IProps> = ({ schedule, date, goCheck }) => {
  const { getReservation } = useReservationActions();

  const reservation = getReservation(date);
  return (
    <Shadow>
      <Block
        backgroundColor={ColorPalette.White.WHITE}
        height={'100px'}
        width={'335px'}
        flexDirection={FlexDirection.ROW}
        sort={Sort.SPACE_AROUND_CENTER}
        padding={[0, 30]}
        margin={[0, 0, 10, 0]}
      >
        <Block sort={Sort.LEFT_CENTER} width={'100%'}>
          <Block flexDirection={FlexDirection.ROW} margin={[2, 0]}>
            <Icon name="time" color={ColorPalette.Main.BG} size={16} />
            <T margin={[0, 10]}>
              {formatTime(schedule.start_time)} -{' '}
              {formatTime(schedule.end_time)}
            </T>
          </Block>
          <Block flexDirection={FlexDirection.ROW} margin={[2, 0]}>
            <MaterialCommunityIcons
              name="whistle"
              size={15}
              color={ColorPalette.Main.BG}
            />

            <T size={12} color={ColorPalette.Gray.GRAY} margin={[2, 0, 2, 8]}>
              Coach {schedule.coach.last_name}
            </T>
          </Block>
          <Block flexDirection={FlexDirection.ROW} margin={[2, 0]}>
            <Icon name="people" color={ColorPalette.Main.BG} size={16} />
            <T size={12} color={ColorPalette.Gray.GRAY} margin={[2, 10]}>
              {schedule.reservations_count} / {schedule.user_limit}명
            </T>
          </Block>
        </Block>
        <Block padding={[5]}>
          {isPassDate(date) ? (
            reservation?.schedule.id === schedule.id ? (
              <Block>
                <T
                  color={ColorPalette.Gray.GAINSBORO}
                  fontFamily={FontFamily.NANUM_BOLD}
                  size={15}
                >
                  예약
                </T>
              </Block>
            ) : (
              <Btn onPress={() => goCheck(date, schedule)}>
                <T
                  color={ColorPalette.Main.BG_DARK}
                  fontFamily={FontFamily.NANUM_BOLD}
                  size={15}
                >
                  예약
                </T>
              </Btn>
            )
          ) : (
            <T
              color={ColorPalette.Gray.GAINSBORO}
              fontFamily={FontFamily.NANUM_BOLD}
              size={15}
            >
              마감
            </T>
          )}
        </Block>
      </Block>
    </Shadow>
  );
};

export default ScheduleItem;
