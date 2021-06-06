import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counter/counterSlice';
import authenticationReducer from '../slices/authentication/authenticationSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    authenticationInputs: authenticationReducer,
  },
});
