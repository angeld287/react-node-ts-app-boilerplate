import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginAsync, logoutAsync, getSessionAsync } from './asyncThunks';
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
  getSessionStatus: 'idle',
  loginStatus: 'idle',
  logoutStatus: 'idle',
  error: undefined,
  message: ""
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
        state.loginStatus = 'pending';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginStatus = 'idle';
        console.log(action.payload.data);

        if (action.payload.data.session) {
          state.user = action.payload.data.session;
          state.error = initialState.error
        } else {
          state.user = initialState.user
          state.error = action.payload.data
        }
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loginStatus = 'failed';
      })
      .addCase(logoutAsync.pending, (state) => {
        state.logoutStatus = 'pending';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.logoutStatus = 'idle';
        state.user = initialState.user;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.logoutStatus = 'failed';
      })
      .addCase(getSessionAsync.pending, (state) => {
        state.getSessionStatus = 'pending';
      })
      .addCase(getSessionAsync.fulfilled, (state, action) => {
        state.getSessionStatus = 'idle';
        state.user = action.payload.data.session !== null ? action.payload.data.session.passport.user.user : initialState;
      })
      .addCase(getSessionAsync.rejected, (state) => {
        state.getSessionStatus = 'failed';
      });
  },
});

//Actions
//export const { } = userSessionSlice.actions;

export const selectUserSession = (state: RootState) => state.userSession;

export default userSessionSlice.reducer;
