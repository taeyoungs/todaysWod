import React from 'react';
import Flex from 'components/molecules/Flex';
import T from 'components/atoms/T';

interface IProps {}

const Reservation: React.FC<IProps> = () => {
  return (
    <Flex>
      <T>예약</T>
    </Flex>
  );
};

export default Reservation;
