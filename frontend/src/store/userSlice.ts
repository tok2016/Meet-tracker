import { createSlice } from '@reduxjs/toolkit';

import UserState from '../utils/types/UserState';
import { UserWithSummaries } from '../utils/types/User';
import { deleteUserData, getCurrentUser, getUserByUsername, postLogin, postLogout, postUserData, patchUserChanges } from './userThunks';
import { isActionWithError } from '../utils/types/ActionWithError';
import Token from '../utils/types/Token';
import { RootState } from './store';

const defaultUser: UserWithSummaries = {
  summaries: [],
  id: 0,
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  registrationDate: (new Date()).toString(),
  isAdmin: false,
  avatar: ''
}

const defaultAuth: Token = {
  token: undefined,
  expireTime: (new Date()).toString()
}

const selectUser = (state: RootState) => state.user;

const initialState: UserState = {
  user: defaultUser,
  auth: defaultAuth,
  status: 'idle',
  error: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postUserData.fulfilled, (state, action) => {
        const user: UserWithSummaries = {
          ...action.payload,
          summaries: []
        };

        state.user = user;
        state.status = 'success';
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.status = 'success';
      })
      .addCase(postLogout.fulfilled, (state) => {
        state.user = defaultUser;
        state.auth = defaultAuth;
        state.status = 'success';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(patchUserChanges.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(deleteUserData.fulfilled, (state) => {
        state.user = defaultUser;
        state.auth = defaultAuth;
        state.status = 'success';
      })
      .addDefaultCase((state, action) => {
        const endpoint = action.type.split('/').pop();

        if(isActionWithError(action)) {
          state.status = 'error';
          state.error = action.error;
        } else {
          state.status = endpoint === 'pending' ? 'pending' : 'idle';
          state.error = undefined;
        }
      })
  }
});

export default userSlice.reducer;
export {selectUser};
