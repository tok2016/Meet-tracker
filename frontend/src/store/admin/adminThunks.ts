import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../store';
import { User, UserPassword, UserRaw, UsersRaw } from '../../types/User';
import AxiosInstance from '../../utils/Axios';
import { arraySnakeToCamel, camelToSnake, getFilterWithDates, getCollectionQuery, getFullSummaries, snakeToCamel, reformUser } from '../../utils/utils';
import { RawSummary, SummariesRaw } from '../../types/Summary';
import CollectionParams from '../../types/CollectionParams';
import { defaultFilter } from '../../types/Filter';
import CollectionData from '../../types/CollectionData';
import UserAvatarQuery from '../../types/UserAvatarQuery';

const getUsers = createAsyncThunk<UsersRaw, CollectionParams, AsyncThunkConfig>(
  'admin/getUsers', 
  async ({page, filter=defaultFilter}, {getState}) => {
    const {user} = getState();

    const query = getCollectionQuery(page, getFilterWithDates(filter));

    const response = await AxiosInstance.get(`/user_filter/?${query}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const data = snakeToCamel<CollectionData>(response.data.pop());
    const rawUsers = arraySnakeToCamel<User>(response.data);
    const users = rawUsers.map((raw) => reformUser(raw));

    const usersWithTotal: UsersRaw = {
      users,
      total: data.total === 0 ? users.length : data.total
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

    const rawUser = snakeToCamel<User>(response.data);
    return reformUser(rawUser);
  }
);

const getUserById = createAsyncThunk<User, number, AsyncThunkConfig>(
  'admin/getUserById',
  async (id, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get(`user/${id}?user_username=${id}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const rawUser = snakeToCamel<User>(response.data);
    return reformUser(rawUser);
  }
);

const patchUserById = createAsyncThunk<User, User, AsyncThunkConfig>(
  'admin/patchUserById',
  async (userUpdate, {getState}) => {
    const {user} = getState();

    const body = camelToSnake(userUpdate);

    const response = await AxiosInstance.patch(`user/${userUpdate.id}?user_username=${userUpdate.id}`, body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const rawUser = snakeToCamel<User>(response.data);
    return reformUser(rawUser);
  }
);

const deleteUserById = createAsyncThunk<void, number, AsyncThunkConfig>(
  'admin/deleteUserById',
  async (id, {getState}) => {
    const {user} = getState();

    await AxiosInstance.delete(`user/${id}?user_username=${id}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

const postUserAvatar = createAsyncThunk<string, UserAvatarQuery, AsyncThunkConfig>(
  'admin/postUserAvatar',
  async ({id, file}, {getState}) => {
    const {user, admin} = getState();

    const finalAvatar = new File([file], `${admin.user.username}_${Date.now()}`, {type: file.type});

    const formData = new FormData();
    formData.append('file', finalAvatar);

    await AxiosInstance.post(`/user/${id}/profile_picture?user_username=${id}`, formData, {
      headers: {
        Authorization: user.auth.token,
        'Content-Type': 'multipart/formData'
      }
    });

    if(admin.user.avatar) {
      URL.revokeObjectURL(admin.user.avatar);
    }

    const avatarUrl = URL.createObjectURL(finalAvatar as File);

    return avatarUrl as string;
  }
);

const getUserAvatar = createAsyncThunk<string, number, AsyncThunkConfig>(
  'admin/getUserAvatar',
  async (id, {getState}) => {
    const {user, admin} = getState();

    const response = await AxiosInstance.get(`/user/${id}/profile_picture?user_username=${id}`, {
      headers: {
        Authorization: user.auth.token
      },
      responseType: 'blob'
    });

    if(admin.user.avatar) {
      URL.revokeObjectURL(admin.user.avatar);
    }

    const avatarUrl = URL.createObjectURL(response.data);

    return avatarUrl as string;
  }
);

const postNewPasswordById = createAsyncThunk<void, UserPassword, AsyncThunkConfig>(
  'admin/postNewPasswordById',
  async ({id, password}, {getState}) => {
    const {user} = getState();
    const body = {'new_password': password};

    await AxiosInstance.post(`/reset-password/${id}?user_username=${id}`, body, {
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

    const query = getCollectionQuery(page, getFilterWithDates(filter));

    const response = await AxiosInstance.get(`/summary_filter/?${query}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const data = snakeToCamel<CollectionData>(response.data.pop());
    const summaries = arraySnakeToCamel<RawSummary>(response.data);

    const summariesWithTotal: SummariesRaw = {
      summaries: getFullSummaries(summaries),
      total: data.total === 0 ? summaries.length : data.total
    };

    return summariesWithTotal;
  }
);

const deleteSummaryById = createAsyncThunk<void, number, AsyncThunkConfig>(
  'admin/deleteSummaryById',
  async (summaryId, {getState}) => {
    const {user, summary} = getState();

    await AxiosInstance.delete(`/delete_record/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    if(summaryId === summary.summary.id && summary.summary.audio) {
      URL.revokeObjectURL(summary.summary.audio);
    }
  }
);

const archiveRecordById = createAsyncThunk<void, number, AsyncThunkConfig>(
  'admin/archiveRecordById',
  async (summaryId, {getState}) => {
    const {user} = getState();

    await AxiosInstance.get(`/record/archive?summary_id=${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

const deleteRecordById = createAsyncThunk<void, number, AsyncThunkConfig>(
  'admin/deleteRecordById', 
  async (summaryId, {getState}) => {
    const {user, summary} = getState();

    await AxiosInstance.delete(`/delete_audio/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    if(summaryId === summary.summary.id && summary.summary.audio) {
      URL.revokeObjectURL(summary.summary.audio);
    }
  }
);

export {getUsers, getUserById, getUserAvatar, getAllSummaries, 
  postNewUser, patchUserById, postUserAvatar, postNewPasswordById,
  deleteUserById, deleteSummaryById, deleteRecordById, archiveRecordById};
