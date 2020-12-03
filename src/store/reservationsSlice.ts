import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReservationProps } from 'models/common';

export interface IRState {
  reservations: Record<number, Array<IReservationProps>>;
  past: {
    records: Array<IReservationProps>;
    page: number;
  };
}

const initialState: IRState = {
  reservations: {},
  past: {
    records: [],
    page: 1,
  },
};

interface IReservationsActionProps {
  month: number;
  reservations: Array<IReservationProps>;
}

interface IReservationActionProps {
  month: number;
  reservation: IReservationProps;
}

function compareReservations(a: IReservationProps, b: IReservationProps) {
  const aDate = new Date(a.date).getTime();
  const bDate = new Date(b.date).getTime();
  return aDate - bDate;
}

function compareDescendReservations(
  a: IReservationProps,
  b: IReservationProps
) {
  const aDate = new Date(a.date).getTime();
  const bDate = new Date(b.date).getTime();
  return bDate - aDate;
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
      state.reservations[month] = state.reservations[month].filter(
        (r) => r.id !== reservation.id
      );
      state.reservations[month] = [
        ...state.reservations[month],
        reservation,
      ].sort(compareReservations);
    },
    deleteReservation: (
      state,
      action: PayloadAction<{ month: number; id: number }>
    ) => {
      const { month, id } = action.payload;
      state.reservations[month] = state.reservations[month].filter(
        (r) => r.id !== id
      );
    },
    setPastReservations: (
      state,
      action: PayloadAction<Array<IReservationProps>>
    ) => {
      state.past.records = action.payload.sort(compareDescendReservations);
      state.past.page = 1;
    },
  },
});

export const {
  setRervations,
  setReservation,
  updateReservation,
  deleteReservation,
  setPastReservations,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
