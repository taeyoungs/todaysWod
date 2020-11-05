import { combineReducers } from 'redux';
import usersSlice from 'store/usersSlice';

const rootReducer = combineReducers({
  usersSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
