import { createSlice } from '@reduxjs/toolkit';

import UserState from '../../types/UserState';
import { getCurrentUser, postLogin, postLogout, postUserData, patchCurrentUser, getCurrentUserAvatar, postCurrentUserAvatar } from './userThunks';
import { isActionWithError } from '../../types/ActionWithError';
import Token from '../../types/Token';
import { RootState } from '../store';
import { defaultUser, User } from '../../types/User';

const defaultAuth: Token = {
  token: undefined,
  expireTime: (new Date()).toString()
}

const initialState: UserState = {
  user: defaultUser,
  auth: defaultAuth,
  wasLoggedOut: false,
  status: 'idle',
  error: undefined
};

const selectUser = (state: RootState) => state.user;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokenFromStorage(state, action) {
      if(action.payload) {
        const savedToken = JSON.parse(action.payload) as Token;

        const isExpired = new Date(savedToken.expireTime) < new Date();

        if(isExpired) {
          localStorage.clear();
        } else {
          state.auth = savedToken;
        }
      }
    },
    setUserFromStorage(state, action) {
      if(action.payload) {
        const savedUser = JSON.parse(action.payload) as User;

        state.user = savedUser;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';

        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.status = 'success';

        localStorage.setItem('auth', JSON.stringify(action.payload));
      })
      .addCase(postLogout.fulfilled, (state) => {
        state.user = defaultUser;
        state.auth = defaultAuth;
        state.wasLoggedOut = true;
        state.status = 'success';

        sessionStorage.clear();
        localStorage.clear();

        URL.revokeObjectURL(state.user.avatar);
      })
      .addCase(postLogout.rejected, (state) => {
        state.user = defaultUser;
        state.auth = defaultAuth;
        state.wasLoggedOut = true;
        state.status = 'success';

        sessionStorage.clear();
        localStorage.clear();

        URL.revokeObjectURL(state.user.avatar);
      })
      .addCase(postCurrentUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
        state.status = 'success';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';

        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getCurrentUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
        state.status = 'success';
      })
      .addCase(patchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
export const {setTokenFromStorage, setUserFromStorage} = userSlice.actions;
