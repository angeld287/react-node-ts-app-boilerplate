import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { registerAsync } from './asyncThunks';
import { IUserRegisterSlice } from './IUserRegister';

export const initialState: IUserRegisterSlice = {
  user: {
    id: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    gender: "",
    userName: "",
  },
  status: 'idle',
};

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,

  //Actions
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
  },

  //async operations
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

//Actions
export const { setEmail } = userRegisterSlice.actions;

export const selectUserRegister = (state: RootState) => state.userRegister;

export default userRegisterSlice.reducer;
