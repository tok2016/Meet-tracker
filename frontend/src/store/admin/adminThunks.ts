import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../store';
import { User, UserQuery, UserRaw, UsersRaw } from '../../utils/types/User';
import AxiosInstance from '../../utils/Axios';
import { arraySnakeToCamel, camelToSnake, getCollectionQuery, getFullSummaries, snakeToCamel } from '../../utils/utils';
import { RawSummary, SummariesRaw } from '../../utils/types/Summary';
import CollectionParams from '../../utils/types/CollectionParams';
import { defaultFilter } from '../../utils/types/Filter';
import CollectionData from '../../utils/types/CollectionData';

const getUsers = createAsyncThunk<UsersRaw, CollectionParams, AsyncThunkConfig>(
  'admin/getUsers', 
  async ({page, filter=defaultFilter}, {getState}) => {
    const {user} = getState();

    const query = getCollectionQuery(page, filter);

    const response = await AxiosInstance.get(`/user_filter/?${query}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const data = snakeToCamel<CollectionData>(response.data.pop());
    const users = arraySnakeToCamel<User>(response.data);

    const usersWithTotal: UsersRaw = {
      users,
      total: data.total ?? users.length
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

    return snakeToCamel<User>(response.data);
  }
);

const getUserByUsername = createAsyncThunk<User, UserQuery, AsyncThunkConfig>(
  'admin/getUserByUsername',
  async ({id, username}, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get(`user/${id}?user_username=${id}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<User>(response.data);
  }
);

const patchUserByUsername = createAsyncThunk<User, User, AsyncThunkConfig>(
  'admin/patchUserByUsername',
  async (userUpdate, {getState}) => {
    const {user} = getState();

    const body = camelToSnake(userUpdate);

    const response = await AxiosInstance.patch(`user/${userUpdate.id}?user_username=${userUpdate.id}`, body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<User>(response.data);
  }
);

const deleteUserByUsername = createAsyncThunk<void, UserQuery, AsyncThunkConfig>(
  'admin/deleteUserByUsername',
  async ({id, username}, {getState}) => {
    const {user} = getState();

    await AxiosInstance.delete(`user/${id}?user_username=${id}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);


const getAllSummaries = createAsyncThunk<SummariesRaw, CollectionParams, AsyncThunkConfig>(
  'admin/getSummaries',
  async ({page, filter=defaultFilter}, {getState}) => {
    const {user} = getState();

    const query = getCollectionQuery(page, filter);

    const response = await AxiosInstance.get(`/summary_filter/?${query}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const data = snakeToCamel<CollectionData>(response.data.pop());
    const summaries = arraySnakeToCamel<RawSummary>(response.data);

    const summariesWithTotal: SummariesRaw = {
      summaries: getFullSummaries(summaries),
      total: data.total ?? summaries.length
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

const deleteRecordById = createAsyncThunk<void, number, AsyncThunkConfig>(
  'admin/deleteRecordById', 
  async (summaryId, {getState}) => {
    const {user} = getState();

    await AxiosInstance.delete(`/delete_audio/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

export {getUsers, getUserByUsername, getAllSummaries, postNewUser, patchUserByUsername, 
  deleteUserByUsername, deleteSummaryById, deleteRecordById
};
