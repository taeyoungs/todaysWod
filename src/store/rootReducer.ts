import { combineReducers } from 'redux';
import usersSlice from 'store/usersSlice';
import reservationsSlice from 'store/reservationsSlice';
import alertsSlice from 'store/alertsSlice';

const rootReducer = combineReducers({
  usersSlice,
  reservationsSlice,
  alertsSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
