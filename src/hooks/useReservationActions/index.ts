import { IReservationProps } from 'models/common';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRervations,
  setReservation,
  updateReservation,
  deleteReservation,
} from 'store/reservationsSlice';
import { RootState } from 'store/rootReducer';

const useReservationActions = () => {
  const dispatch = useDispatch();
  const rSlice = useSelector((state: RootState) => state.reservationsSlice);

  const onSetReservations = useCallback(
    (data: { month: number; reservations: Array<IReservationProps> }) =>
      dispatch(setRervations(data)),
    [dispatch]
  );

  const onSetReservation = useCallback(
    (data: { month: number; reservation: IReservationProps }) =>
      dispatch(setReservation(data)),
    [dispatch]
  );

  const onUpdateReservation = useCallback(
    (data: { month: number; reservation: IReservationProps }) =>
      dispatch(updateReservation(data)),
    [dispatch]
  );

  const onDeleteReservaton = useCallback(
    (data: { month: number; id: number }) => dispatch(deleteReservation(data)),
    [dispatch]
  );

  const getReservation = (date: string): IReservationProps | undefined => {
    const month = date.split('-')[1];
    const reservations = rSlice.reservations[parseInt(month)];
    const reservation = reservations.find((r) => r.date === date);
    return reservation;
  };

  return {
    onSetReservations,
    onSetReservation,
    onUpdateReservation,
    onDeleteReservaton,
    getReservation,
  };
};

export default useReservationActions;
