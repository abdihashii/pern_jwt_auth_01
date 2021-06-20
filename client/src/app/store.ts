import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counter/counterSlice';
import authenticationReducer from '../slices/authentication/authenticationSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    authenticationInputs: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
