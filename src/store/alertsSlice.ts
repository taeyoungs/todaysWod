import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlertProps } from 'models/common';

export interface IAlertState {
  alerts: Array<IAlertProps>;
  page: number;
  count: number;
}

const initialState: IAlertState = {
  alerts: [],
  page: 1,
  count: 0,
};

export interface IAlertActionProps {
  alerts: Array<IAlertProps>;
  page?: number;
  count: number;
}

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<IAlertActionProps>) => {
      const { alerts, count, page } = action.payload;
      if (page === 1) {
        state.alerts = alerts;
        state.page = 1;
        state.count = count;
      } else {
        state.alerts = [...state.alerts, ...alerts];
        state.count = count;
      }
    },
    increasePage: (state) => {
      state.page += 1;
    },
  },
});

export const { setAlerts, increasePage } = alertsSlice.actions;

export default alertsSlice.reducer;
