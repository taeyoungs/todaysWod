import React from 'react';
import T, { TextAlign } from 'components/atoms/T';
import Shadow from 'components/molecules/Shadow';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import { dayOfTheWeek, formatTime } from 'utils';

interface IProps {
  date: string;
  startTime: string;
  endTime: string;
  name: string;
}

const Ticket: React.FC<IProps> = ({ date, startTime, endTime, name }) => {
  const d = date.split('-');
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
            {dayOfTheWeek(date)}
          </T>
        </Block>
        <Block sort={Sort.LEFT_CENTER} padding={[0, 20]}>
          <T margin={[0, 0, 5, 0]}>
            {formatTime(startTime)} ~ {formatTime(endTime)}
          </T>
          <T size={12} color={ColorPalette.Gray.GRAY}>
            Coach {name}
          </T>
        </Block>
      </Block>
    </Shadow>
  );
};

export default Ticket;
