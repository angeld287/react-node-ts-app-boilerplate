import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSessionReducer from '../features/userSession/userSessionSlice';
import userRegisterReducer from '../features/userRegister/userRegisterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSession: userSessionReducer,
    userRegister: userRegisterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
