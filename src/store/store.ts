import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  PAUSE,
} from 'redux-persist';
import rootReducer from 'store/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PERSIST, PURGE, REGISTER, REHYDRATE, PAUSE],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
