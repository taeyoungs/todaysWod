import React from 'react';
import Flex from 'components/molecules/Flex';
import T from 'components/atoms/T';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

interface IProps {}

const Alerts: React.FC<IProps> = () => {
  const testData = useSelector((state: RootState) => state.reservationsSlice);
  console.log(testData.reservations);

  return (
    <Flex>
      {/* {testData.reservations.map((reservation) => (
        <T key={reservation.id}>{reservation.id}</T>
      ))} */}
      <T>알림</T>
    </Flex>
  );
};

export default Alerts;
