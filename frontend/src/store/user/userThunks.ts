import { createAsyncThunk } from '@reduxjs/toolkit';

import { User, UserLogin, UserRaw } from '../../types/User';
import { AsyncThunkConfig } from '../store';
import AxiosInstance from '../../utils/Axios';
import Token, { TokenRaw } from '../../types/Token';
import { camelToSnake, snakeToCamel, TOKEN_TIME_TO_LIVE } from '../../utils/utils';

const PHONE_NUMBER_LENGTH = 10;

const postUserData = createAsyncThunk<User, UserRaw, AsyncThunkConfig>(
  'user/postUserData', 
  async (userData) => {
    const finalUser = {...userData, chatId: '', phoneNumber: userData.phoneNumber.slice(userData.phoneNumber.length - PHONE_NUMBER_LENGTH)};
    const body = camelToSnake(finalUser);

    const response = await AxiosInstance.post('/user', body);

    return snakeToCamel<User>(response.data);
  }
);

const postLogin = createAsyncThunk<Token, UserLogin, AsyncThunkConfig>(
  'user/postUserLogin',
  async (userLogin) => {

    const body = `username=${encodeURIComponent(userLogin.email)}&password=${encodeURIComponent(userLogin.password)}`;

    const response = await AxiosInstance.post('/user/login', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const tokenRaw = response.data as TokenRaw;

    const tokenTypeCapital = `${tokenRaw['token_type'].charAt(0).toUpperCase()}${tokenRaw['token_type'].slice(1)}`;

    const expireTime = new Date(Date.now() + TOKEN_TIME_TO_LIVE).toISOString();

    const token: Token = {
      token: `${tokenTypeCapital} ${tokenRaw['access_token']}`,
      expireTime
    };

    return token;
  }
);

const postLogout = createAsyncThunk<void, void, AsyncThunkConfig>(
  'user/postLogout',
  async (_, {getState}) => {
    const {user} = getState();

    await AxiosInstance.post('/user/logout', undefined, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

const getCurrentUser = createAsyncThunk<User, void, AsyncThunkConfig>(
  'user/getCurrentUser',
  async (_, { getState }) => {
    const {user} = getState();

    const response = await AxiosInstance.get('/current_user/', {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<User>(response.data);
  }
);

const patchCurrentUser = createAsyncThunk<User, UserRaw, AsyncThunkConfig>(
  'user/patchCurrentUser',
  async (userUpdate, {getState}) => {
    const {user} = getState();

    const body = camelToSnake(userUpdate);

    const response = await AxiosInstance.patch('/current_user/', body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<User>(response.data);
  }
);

const postCurrentUserAvatar = createAsyncThunk<string, Blob, AsyncThunkConfig>(
  'user/postCurrentUserAvatar',
  async (avatar, {getState}) => {
    const {user} = getState();

    const finalAvatar = new File([avatar], `${user.user.username}_${Date.now()}`, {type: avatar.type});

    const formData = new FormData();
    formData.append('file', finalAvatar);

    await AxiosInstance.post('/current_user/upload_picture', formData, {
      headers: {
        Authorization: user.auth.token,
        'Content-Type': 'multipart/formData'
      }
    });

    if(user.user.avatar) {
      URL.revokeObjectURL(user.user.avatar);
    }

    const avatarUrl = URL.createObjectURL(finalAvatar as File);

    return avatarUrl as string;
  }
);

const getCurrentUserAvatar = createAsyncThunk<string, void, AsyncThunkConfig>(
  'user/getCurrentUserAvatar',
  async (_, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get('/current_user/profile_picture', {
      headers: {
        Authorization: user.auth.token
      },
      responseType: 'blob'
    })
    
    if(user.user.avatar) {
      URL.revokeObjectURL(user.user.avatar);
    }

    const avatarUrl = URL.createObjectURL(response.data);

    return avatarUrl as string;
  }
);

const postNewPassword = createAsyncThunk<void, string, AsyncThunkConfig>(
  'user/postNewPassword',
  async (password, {getState}) => {
    const {user} = getState();
    const body = {'new_password': password};

    await AxiosInstance.post('/current-user/reset-password', body, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

export {getCurrentUser, getCurrentUserAvatar, postLogin, postLogout, 
  postUserData, postCurrentUserAvatar, postNewPassword, patchCurrentUser};
