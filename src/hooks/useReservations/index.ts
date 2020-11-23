import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { IReservationProps } from 'models/common';

const useReservations = (month: number): Array<IReservationProps> => {
  const rSlice = useSelector((state: RootState) => state.reservationsSlice);
  //   const month = date.split('-')[1];
  const reservations = rSlice.reservations[month];
  return reservations;
};

export default useReservations;
