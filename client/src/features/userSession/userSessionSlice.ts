import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IUser } from '../../interfaces/models/IUser';
import { loginAsync, logoutAsync } from './asyncThunks';
import { IUserSlice } from './IUserSession';

const initialState: IUserSlice = {
  user: {
    id: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordResetToken: "",
    passwordResetExpires: new Date(),

    fullname: "",
    gender: "",
    userName: "",
  },
  status: 'idle',
};

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,

  //Actions
  reducers: {},

  //async operations
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = initialState.user;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

//Actions
export const { } = userSessionSlice.actions;

export const selectUserSession = (state: RootState) => state.userSession;

export default userSessionSlice.reducer;
