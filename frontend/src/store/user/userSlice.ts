import { createSlice } from '@reduxjs/toolkit';

import UserState from '../../utils/types/UserState';
import { deleteUserData, getCurrentUser, getUserByUsername, postLogin, postLogout, postUserData, patchUserChanges } from './userThunks';
import { isActionWithError } from '../../utils/types/ActionWithError';
import Token from '../../utils/types/Token';
import { RootState } from '../store';
import { User } from '../../utils/types/User';
//import { TOKEN_TIME_TO_LIVE } from '../../utils/utils';

const defaultUser: User = {
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

const initialState: UserState = {
  user: defaultUser,
  auth: defaultAuth,
  status: 'idle',
  error: undefined
};

const selectUser = (state: RootState) => state.user;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokenFromStorage(state, action) {
      state.auth.token = action.payload.token;
      state.auth.expireTime = new Date(action.payload.expireTime).toISOString();
    },
    setUserFromStorage(state, action) {
      state.user = action.payload.user;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';

        //sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.status = 'success';

        /*if(action.payload.token) {
          const ttl = Date.now() + TOKEN_TIME_TO_LIVE;
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('expireTime', ttl.toString());
        }*/
      })
      .addCase(postLogout.fulfilled, (state) => {
        state.user = defaultUser;
        state.auth = defaultAuth;
        state.status = 'success';

        //localStorage.clear();
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
export const {setTokenFromStorage} = userSlice.actions;
