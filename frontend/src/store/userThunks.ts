import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserLogin, UserRaw, UserWithSummaries } from '../utils/types/User';
import { AsyncThunkConfig } from './store';
import AxiosInstance from '../utils/Axios';
import Token from '../utils/types/Token';

const postUserData = createAsyncThunk<User, UserRaw, AsyncThunkConfig>(
  'user/postUserData', 
  async (userData) => {
    const responce = await AxiosInstance.post('/user', userData);
    return responce.data as User;
  }
);

const postLogin = createAsyncThunk<Token, UserLogin, AsyncThunkConfig>(
  'user/postUserLogin',
  async (userLogin) => {
    const responce = await AxiosInstance.post('/user/login', userLogin);
    return responce.data as Token;
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

    return responce.data as UserWithSummaries;
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

    return responce.data as UserWithSummaries;
  }
);

const putUserChanges = createAsyncThunk<UserWithSummaries, UserRaw, AsyncThunkConfig>(
  'user/putUserChanges',
  async (userUpdate, { getState }) => {
    const {user} = getState();

    const responce = await AxiosInstance.put(`/user/${userUpdate.username}`, userUpdate, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return responce.data as UserWithSummaries;
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
  postLogout, postUserData, putUserChanges, deleteUserData};
