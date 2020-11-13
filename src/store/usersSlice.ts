import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  boxId: string | null;
  registrationState: string;
}

const initialState: IUserState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  boxId: null,
  registrationState: 'unregistered',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<Record<string, string>>) => {
      (state.isLoggedIn = true),
        (state.token = action.payload.token),
        (state.userId = action.payload.userId),
        (state.boxId = action.payload.boxId),
        (state.registrationState = action.payload.registrationState);
    },
    logOut: (state) => {
      (state.isLoggedIn = false),
        (state.token = null),
        (state.userId = null),
        (state.boxId = null),
        (state.registrationState = 'unregistered');
    },
    enrollBox: (state, action: PayloadAction<Record<string, string>>) => {
      (state.boxId = action.payload.boxId),
        (state.registrationState = 'pending');
    },
    updateRState: (state, action: PayloadAction<Record<string, string>>) => {
      state.registrationState = action.payload.registrationState;
    },
  },
});

export const { logIn, logOut, enrollBox, updateRState } = usersSlice.actions;

export default usersSlice.reducer;
