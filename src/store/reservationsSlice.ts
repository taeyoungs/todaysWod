import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReservationProps } from 'models/common';

export interface IRState {
  reservations: Record<number, Array<IReservationProps>>;
}

const initialState: IRState = {
  reservations: {},
};

// ToDo1: 이번 달일 경우 reservations 초기화
// ToDo2: 년 월 처리는 디스패치 하기 전에 처리 (디스패치 여부를 결정)

interface IReservationsActionProps {
  month: number;
  reservations: Array<IReservationProps>;
}

interface IReservationActionProps {
  month: number;
  reservation: IReservationProps;
}

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setRervations: (state, action: PayloadAction<IReservationsActionProps>) => {
      const { month, reservations } = action.payload;
      const thisMonth = new Date().getMonth() + 1;
      if (thisMonth === month) state.reservations = {};
      state.reservations[month] = reservations;
    },
    setReservation: (state, action: PayloadAction<IReservationActionProps>) => {
      const { month, reservation } = action.payload;
      function compareReservations(a: IReservationProps, b: IReservationProps) {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      }
      state.reservations[month] = [
        ...state.reservations[month],
        reservation,
      ].sort(compareReservations);
    },
    updateReservation: (
      state,
      action: PayloadAction<IReservationActionProps>
    ) => {
      const { month, reservation } = action.payload;
      function compareReservations(a: IReservationProps, b: IReservationProps) {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      }
      state.reservations[month] = state.reservations[month].filter(
        (r) => r.id !== reservation.id
      );
      state.reservations[month] = [
        ...state.reservations[month],
        reservation,
      ].sort(compareReservations);
    },
  },
});

export const {
  setRervations,
  setReservation,
  updateReservation,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
