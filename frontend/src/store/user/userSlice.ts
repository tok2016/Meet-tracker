import { createSlice } from '@reduxjs/toolkit';

import UserState from '../../types/UserState';
import { getCurrentUser, postLogin, postLogout, postUserData, patchCurrentUser, getCurrentUserAvatar, postCurrentUserAvatar, postNewPassword } from './userThunks';
import { isActionWithError } from '../../types/ActionWithError';
import Token from '../../types/Token';
import { RootState } from '../store';
import { defaultUser, User } from '../../types/User';
import { DefaultErrors, getErrorMessage } from '../../utils/Error';
import { AVATAR_GET_ERRORS, AVATAR_POST_ERRORS, GET_USER_ERRORS, LOGIN_ERRORS, PATCH_USER_ERRORS, REGISTER_ERRORS, USER_PASSWORD_ERRORS } from './userErrors';

const defaultAuth: Token = {
  token: undefined,
  expireTime: (new Date()).toString()
}

const initialState: UserState = {
  user: defaultUser,
  auth: defaultAuth,
  wasLoggedOut: false,
  status: 'idle',
  error: undefined,
  passwordError: undefined,
  avatarError: undefined,
  loginError: undefined,
  registerError: undefined
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
    },
    clearError(state) {
      state.error = '';
      state.loginError = '';
      state.registerError = '';
      state.avatarError = '';
      state.passwordError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';

        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(postUserData.rejected, (state, action) => {
        state.status = 'error';
        state.registerError = getErrorMessage(REGISTER_ERRORS, action.error.code);
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.status = 'success';

        localStorage.setItem('auth', JSON.stringify(action.payload));
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.status = 'error';
        state.auth = defaultAuth;
        state.loginError = getErrorMessage(LOGIN_ERRORS, action.error.code);
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
      .addCase(postCurrentUserAvatar.rejected, (state, action) => {
        state.status = 'error';
        state.avatarError = getErrorMessage(AVATAR_POST_ERRORS, action.error.code);
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';

        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(GET_USER_ERRORS, action.error.code);
      })
      .addCase(getCurrentUserAvatar.fulfilled, (state, action) => {
        if(typeof state.user !== 'string') {
          state.user.avatar = action.payload;
        }
        state.status = 'success';
      })
      .addCase(getCurrentUserAvatar.rejected, (state, action) => {
        state.status = 'error';

        if(state.user.avatar) {
          URL.revokeObjectURL(state.user.avatar);
        }

        state.avatarError = getErrorMessage(AVATAR_GET_ERRORS, action.error.code);
      })
      .addCase(patchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';

        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(patchCurrentUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(PATCH_USER_ERRORS, action.error.code);
      })
      .addCase(postNewPassword.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(postNewPassword.rejected, (state, action) => {
        state.status = 'error';
        state.passwordError = getErrorMessage(USER_PASSWORD_ERRORS, action.error.code);
      })
      .addDefaultCase((state, action) => {
        const endpoints = action.type.split('/');
        const status = endpoints[endpoints.length - 1];
        const type = endpoints[endpoints.length - 2];

        if(isActionWithError(action)) {
          state.status = 'error';
          state.error = DefaultErrors['ERR_INTERNET_SERVER_ERROR'];
        } else {
          state.status = status === 'pending' ? 'pending' : 'idle';

          if(type === 'postLogin') {
            state.loginError = undefined;
          } else if(type === 'postUserData') {
            state.registerError = undefined;
          } else if(type?.includes('Avatar')) {
            state.avatarError = undefined;
          } else if(type?.includes('Password')) {
            state.passwordError = undefined;
          } else {
            state.error = undefined;
          }
        }
      })
  }
});

export default userSlice.reducer;
export {selectUser};
export const {setTokenFromStorage, setUserFromStorage, clearError: clearUserError} = userSlice.actions;
