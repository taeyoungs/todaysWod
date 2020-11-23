import { combineReducers } from 'redux';
import usersSlice from 'store/usersSlice';
import reservationsSlice from 'store/reservationsSlice';

const rootReducer = combineReducers({
  usersSlice,
  reservationsSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
