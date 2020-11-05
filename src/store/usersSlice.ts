import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: IState = {
  isLoggedIn: false,
  token: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<Record<string, string>>) => {
      (state.isLoggedIn = true), (state.token = action.payload.token);
    },
    logOut: (state, _) => {
      (state.isLoggedIn = false), (state.token = null);
    },
  },
});

export const { logIn, logOut } = usersSlice.actions;
export default usersSlice.reducer;
