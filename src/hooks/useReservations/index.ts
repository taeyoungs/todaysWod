import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { IReservationProps } from 'models/common';

export interface IPastRProps {
  records: Array<IReservationProps>;
  recordsCnt: number;
  confirmCnt: number;
  canceledCnt: number;
}

const useReservations = (month: number): Array<IReservationProps> => {
  const rSlice = useSelector((state: RootState) => state.reservationsSlice);

  const reservations = rSlice.reservations[month];
  return reservations;
};

export default useReservations;
