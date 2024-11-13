import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../store';
import { User, UserRaw, UsersRaw } from '../../utils/types/User';
import AxiosInstance from '../../utils/Axios';
import { arraySnakeToCamel, camelToSnake, getFullSummaries, getOffsetQuery, snakeToCamel } from '../../utils/utils';
import { SmallSummary, SummariesRaw } from '../../utils/types/Summary';

const getUsers = createAsyncThunk<UsersRaw, number, AsyncThunkConfig>(
  'admin/getUsers', 
  async (page: number, {getState}) => {
    const {user} = getState();

    const query = getOffsetQuery(page);

    const response = await AxiosInstance.get(`/users?${query}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const users = arraySnakeToCamel<User>(response.data);

    const usersWithTotal: UsersRaw = {
      users,
      total: response.data.total ? response.data.total : users.length
    };

    return usersWithTotal;
  }
);

const postNewUser = createAsyncThunk<User, UserRaw, AsyncThunkConfig>(
  'admin/postNewUser',
  async (userData, {getState}) => {
    const {user} = getState();

    const body = camelToSnake(userData);

    const response = await AxiosInstance.post('/user/', body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(response.data) as User;
  }
);

const getUserByUsername = createAsyncThunk<User, string, AsyncThunkConfig>(
  'admin/getUserByUsername',
  async (username, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get(`user/${username}?user_username=${username}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(response.data) as User;
  }
);

const patchUserByUsername = createAsyncThunk<User, UserRaw, AsyncThunkConfig>(
  'admin/patchUserByUsername',
  async (userUpdate, {getState}) => {
    const {user} = getState();

    const body = camelToSnake(userUpdate);

    const response = await AxiosInstance.patch(`user/${userUpdate.username}?user_username=${userUpdate.username}`, body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(response.data) as User;
  }
);

const deleteUserByUsername = createAsyncThunk<void, string, AsyncThunkConfig>(
  'admin/deleteUserByUsername',
  async (username, {getState}) => {
    const {user} = getState();

    await AxiosInstance.delete(`user/${username}?user_username=${username}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);


const getAllSummaries = createAsyncThunk<SummariesRaw, number, AsyncThunkConfig>(
  'admin/getSummaries',
  async (page, {getState}) => {
    const {user} = getState();

    const query = getOffsetQuery(page);

    const response = await AxiosInstance.get(`/records?${query}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const summaries = arraySnakeToCamel<SmallSummary>(response.data);
    const summariesWithTotal: SummariesRaw = {
      summaries: getFullSummaries(summaries),
      total: response.data.token ? response.data.token : summaries.length
    };

    return summariesWithTotal;
  }
);

const deleteSummaryById = createAsyncThunk<void, number, AsyncThunkConfig>(
  'admin/deleteSummaryById',
  async (summaryId, {getState}) => {
    const {user} = getState();

    await AxiosInstance.delete(`/delete_record/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

const deleteRecordById = createAsyncThunk<void, string | number, AsyncThunkConfig>(
  'admin/deleteRecordById', 
  async (recordId, {getState}) => {
    const {user} = getState();

    await AxiosInstance.delete(`/delete_audio/${recordId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

export {getUsers, getUserByUsername, getAllSummaries, postNewUser, patchUserByUsername, 
  deleteUserByUsername, deleteSummaryById, deleteRecordById
};
