import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { IReservationProps } from 'models/common';
import useReservationActions from 'hooks/useReservationActions';

const useReservations = (month?: number): Array<IReservationProps> => {
  const rSlice = useSelector((state: RootState) => state.reservationsSlice);
  // const { getPastReservationPage } = useReservationActions();

  if (month) {
    const reservations = rSlice.reservations[month];
    return reservations;
  } else {
    // const pageSize = 6;
    // return rSlice.past.records.slice(0, getPastReservationPage() * pageSize);
    return rSlice.past.records;
  }
};

export default useReservations;
