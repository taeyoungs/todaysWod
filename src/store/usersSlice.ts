import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  boxId: string | null;
}

const initialState: IUserState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  boxId: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<Record<string, string>>) => {
      (state.isLoggedIn = true),
        (state.token = action.payload.token),
        (state.userId = action.payload.userId),
        (state.boxId = action.payload.boxId);
    },
    logOut: (state) => {
      (state.isLoggedIn = false),
        (state.token = null),
        (state.userId = null),
        (state.boxId = null);
    },
  },
});

export const { logIn, logOut } = usersSlice.actions;

export default usersSlice.reducer;
