import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authenticationInputs',
  initialState: {
    login: {
      email: '',
      password: '',
    },
    register: {
      name: '',
      email: '',
      password: '',
    },
  },
  reducers: {
    changeInput: (state, action) => {
      const { auth, name, value } = action.payload;

      state[auth][name] = value;
    },
    resetInputs: (state, action) => {
      const { auth } = action.payload;

      for (const key of Object.keys(state[auth])) {
        debugger;
        state[auth][key] = '';
      }
    },
  },
});

export const { changeInput, resetInputs } = authenticationSlice.actions;

export default authenticationSlice.reducer;
