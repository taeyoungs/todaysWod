import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoxProps, IUserProps } from 'models/common';

export interface IUserState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  user: IUserProps | null;
}

const initialState: IUserState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  user: null,
};

export interface ILoginProps {
  token: string;
  userId: string;
  user: IUserProps;
}

export interface IEnrollBoxProps {
  box: IBoxProps;
  registrationState: string;
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<ILoginProps>) => {
      (state.isLoggedIn = true),
        (state.token = action.payload.token),
        (state.userId = action.payload.userId),
        (state.user = action.payload.user);
    },
    logOut: (state) => {
      (state.isLoggedIn = false),
        (state.token = null),
        (state.userId = null),
        (state.user = null);
    },
    setUser: (state, action: PayloadAction<IUserProps>) => {
      state.user = action.payload;
    },
    enrollBox: (state, action: PayloadAction<IEnrollBoxProps>) => {
      if (state.user) {
        (state.user.box = action.payload.box),
          (state.user.registration_state = action.payload.registrationState);
      }
    },
    updateRState: (state, action: PayloadAction<Record<string, string>>) => {
      if (state.user) {
        state.user.registration_state = action.payload.registrationState;
      }
    },
    setHasNewAlert: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.has_new_alert = action.payload;
      }
    },
  },
});

export const {
  logIn,
  logOut,
  enrollBox,
  setUser,
  updateRState,
  setHasNewAlert,
} = usersSlice.actions;

export default usersSlice.reducer;
