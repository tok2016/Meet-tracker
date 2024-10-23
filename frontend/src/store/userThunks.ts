import { createAsyncThunk } from '@reduxjs/toolkit';

import { User, UserLogin, UserRaw, UserWithSummaries } from '../utils/types/User';
import { AsyncThunkConfig } from './store';
import AxiosInstance from '../utils/Axios';
import Token, { TokenRaw } from '../utils/types/Token';
import { camelToSnake, snakeToCamel } from '../utils/utils';

const postUserData = createAsyncThunk<User, UserRaw, AsyncThunkConfig>(
  'user/postUserData', 
  async (userData) => {
    const body = camelToSnake(userData);

    const responce = await AxiosInstance.post('/user', body);
    return snakeToCamel(responce.data) as User;
  }
);

const postLogin = createAsyncThunk<Token, UserLogin, AsyncThunkConfig>(
  'user/postUserLogin',
  async (userLogin) => {
    const responce = await AxiosInstance.post('/user/login', userLogin);

    const tokenRaw = responce.data as TokenRaw;

    const token: Token = {
      token: `${tokenRaw['token_type']} ${tokenRaw['access_token']}`,
      expireTime: responce.headers['X-Expires-After']
    };

    return token;
  }
);

const postLogout = createAsyncThunk<void, void, AsyncThunkConfig>(
  'user/postLogout',
  async () => {
    await AxiosInstance.post('/user/logout');
  }
);

const getCurrentUser = createAsyncThunk<UserWithSummaries, void, AsyncThunkConfig>(
  'user/getCurrentUser',
  async (_, { getState }) => {
    const {user} = getState();

    const responce = await AxiosInstance.get(`/me`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(responce.data) as UserWithSummaries;
  }
);

const getUserByUsername = createAsyncThunk<UserWithSummaries, string, AsyncThunkConfig>(
  'user/getUserByUsername',
  async (username, { getState }) => {
    const {user} = getState();

    const responce = await AxiosInstance.get(`/user/${username}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(responce.data) as UserWithSummaries;
  }
);

const patchUserChanges = createAsyncThunk<UserWithSummaries, UserRaw, AsyncThunkConfig>(
  'user/patchUserChanges',
  async (userUpdate, { getState }) => {
    const {user} = getState();
    const body = camelToSnake(userUpdate);

    const responce = await AxiosInstance.patch(`/user/${userUpdate.username}`, body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(responce.data) as UserWithSummaries;
  }
);

const deleteUserData = createAsyncThunk<void, string, AsyncThunkConfig>(
  'user/deleteUserData',
  async (username, { getState }) => {
    const {user} = getState();

    await AxiosInstance.delete(`/user/${username}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

export {getCurrentUser, getUserByUsername, postLogin, 
  postLogout, postUserData, patchUserChanges, deleteUserData};
