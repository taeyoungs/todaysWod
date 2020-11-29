import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAlertState {
  hasNewAlert: boolean;
}

const initialState: IAlertState = {
  hasNewAlert: false,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    toggleHasNewAlert: (state) => {
      state.hasNewAlert = !state.hasNewAlert;
    },
  },
});

export const { toggleHasNewAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
