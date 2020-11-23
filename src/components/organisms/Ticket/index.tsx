import React from 'react';
import T, { TextAlign } from 'components/atoms/T';
import Shadow from 'components/molecules/Shadow';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import { createTwoButtonAlert, dayOfTheWeek, formatTime } from 'utils';
import Icon from 'components/atoms/Icon';
import Btn from 'components/atoms/Button';
import { IReservationProps } from 'models/common';

interface IProps {
  reservation: IReservationProps;
}

const Ticket: React.FC<IProps> = ({ reservation }) => {
  const d = reservation.date.split('-');
  return (
    <Shadow>
      <Block
        height={'70px'}
        width={'100%'}
        backgroundColor={ColorPalette.White.WHITE}
        border={[0, 0, 0, 3]}
        borderColor={ColorPalette.Main.TXT}
        margin={[0, 0, 10, 0]}
        flexDirection={FlexDirection.ROW}
        sort={Sort.LEFT_CENTER}
      >
        <Block
          padding={[5, 20]}
          borderColor={ColorPalette.White.SMOKE}
          border={[0, 2, 0, 0]}
        >
          <T size={16} margin={[0, 0, 5, 0]}>
            {`${d[1]}/${d[2]}`}
          </T>
          <T size={12} align={TextAlign.CENTER} color={ColorPalette.Gray.GRAY}>
            {dayOfTheWeek(reservation.date)}
          </T>
        </Block>
        <Block sort={Sort.LEFT_CENTER} padding={[0, 20]}>
          <T margin={[0, 0, 5, 0]}>
            {formatTime(reservation.schedule.start_time)} -{' '}
            {formatTime(reservation.schedule.end_time)}
          </T>
          <T size={12} color={ColorPalette.Gray.GRAY}>
            Coach {reservation.schedule.coach.last_name}
          </T>
        </Block>
        <Block>
          <Btn
            onPress={() => {
              createTwoButtonAlert(
                reservation.date,
                formatTime(reservation.schedule.start_time),
                formatTime(reservation.schedule.end_time),
                () => console.log('blah')
              );
            }}
          >
            <Icon
              name="close-circle-outline"
              color={ColorPalette.Gray.GAINSBORO}
              size={20}
            />
          </Btn>
        </Block>
      </Block>
    </Shadow>
  );
};

export default Ticket;
