import React from 'react';
import T, { TextAlign } from 'components/atoms/T';
import Icon from 'components/atoms/Icon';
import Btn from 'components/atoms/Button';
import Shadow from 'components/molecules/Shadow';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import useUser from 'hooks/useUser';
import useReservationActions from 'hooks/useReservationActions';
import { ColorPalette } from 'models/color';
import { IReservationProps } from 'models/common';
import { createTwoButtonAlert, dayOfTheWeek, formatTime } from 'utils';
import api from 'api';

interface IProps {
  reservation: IReservationProps;
  calendar?: boolean;
}

const Ticket: React.FC<IProps> = ({ reservation, calendar = true }) => {
  const d = reservation.date.split('-');
  const { onDeleteReservaton } = useReservationActions();
  const { token } = useUser();
  const handleDelete = async () => {
    try {
      onDeleteReservaton({ month: parseInt(d[1]), id: reservation.id });
      await api.deleteReservation(token, reservation.id);
    } catch (error) {
      console.warn(error);
    }
  };
  const ticketColor =
    reservation.state === 'pending'
      ? ColorPalette.Main.TXT
      : reservation.state === 'confirmed'
      ? ColorPalette.Main.BG
      : ColorPalette.Red.RED;
  return (
    <Shadow>
      <Block
        height={'70px'}
        width={'100%'}
        backgroundColor={ColorPalette.White.WHITE}
        border={[0, 0, 0, 3]}
        borderColor={ticketColor}
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
          {calendar ? (
            <Btn
              onPress={() => {
                createTwoButtonAlert(
                  reservation.date,
                  formatTime(reservation.schedule.start_time),
                  formatTime(reservation.schedule.end_time),
                  handleDelete
                );
              }}
            >
              <Icon
                name="close-circle-outline"
                color={ColorPalette.Gray.GAINSBORO}
                size={20}
              />
            </Btn>
          ) : (
            <Block margin={[0, 0, 0, 20]}>
              <Icon
                name={reservation.state === 'confirmed' ? 'checkmark' : 'close'}
                color={ticketColor}
              />
            </Block>
          )}
        </Block>
      </Block>
    </Shadow>
  );
};

export default Ticket;
