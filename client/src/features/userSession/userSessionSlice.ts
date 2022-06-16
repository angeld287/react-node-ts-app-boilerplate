import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IUser } from '../../interfaces/models/IUser';
import IUserService from '../../interfaces/IUserService'
import UserService from '../../apis/userService'

const userService: IUserService = new UserService();

interface IUserSlice {
  status: 'idle' | 'pending' | 'succeeded' | 'failed',
  user: IUser
}

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

interface ICredentials {
  username: string,
  password: string
}

export const loginAsync = createAsyncThunk(
  'userSession/login',
  async (args: ICredentials) => {
    return await userService.login(args.username, args.password);
  }
);

export const logoutAsync = createAsyncThunk(
  'userSession/logout',
  async () => {
    return await userService.logout();
  }
);

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,

  //not async operations
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

//export not async operations
export const { } = userSessionSlice.actions;

export const selectUserSession = (state: RootState) => state.userSession;

export default userSessionSlice.reducer;
