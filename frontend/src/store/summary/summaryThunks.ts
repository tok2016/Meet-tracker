import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../store';
import AxiosInstance from '../../utils/Axios';
import { arraySnakeToCamel, getCollectionQuery, getFilterWithDates, getFullSummaries, getFullSummary, getLocaleString, snakeToCamel } from '../../utils/utils';
import Summary, { SummariesRaw, SummaryUpdate, RawSummary } from '../../types/Summary';
import CollectionData from '../../types/CollectionData';
import Filter, { defaultFilter } from '../../types/Filter';
import CollectionParams from '../../types/CollectionParams';
import RecordQuery from '../../types/RecordQuery';

const RECORD_UPLOAD_TIMEOUT = 1000 * 60 * 10;

const postRecordFile = createAsyncThunk<Summary, RecordQuery, AsyncThunkConfig>(
  'summary/postRecordFile',
  async ({file, title}, {getState}) => {
    const {user, summary} = getState();

    const formData = new FormData();
    const finalFile = new File([file], 'audio', {type: file.type});
    formData.append('file', finalFile);

    const finalTitle = title ? title : `Встреча ${getLocaleString(new Date().toISOString())}`

    const response = await AxiosInstance.post(`/record/diarize?title=${finalTitle}`, formData, {
      timeout: RECORD_UPLOAD_TIMEOUT,
      headers: {
        Authorization: user.auth.token,
        'Content-Type': 'multipart/fromData'
      },
    });

    if(summary.summary.audio) {
      URL.revokeObjectURL(summary.summary.audio);
    }

    const audio = URL.createObjectURL(file);

    const rawSummary = snakeToCamel<RawSummary>(response.data);
    const resultSummary = getFullSummary(rawSummary, audio);

    return resultSummary;
  }
);

const getSummary = createAsyncThunk<Summary, number, AsyncThunkConfig>(
  'summary/getSummary',
  async (summaryId, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get(`/summary/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
    
    const rawSummary = snakeToCamel<RawSummary>(response.data);
    const resultSummary = getFullSummary(rawSummary);

    return resultSummary;
  }
);

const putSummaryChanges = createAsyncThunk<Summary, SummaryUpdate, AsyncThunkConfig>(
  'summary/putSummaryChanges',
  async (summaryUpdate, {getState}) => {
    const {user, admin} = getState();

    const query = `summary_id=${summaryUpdate.id}&text_input=${summaryUpdate.text[0].text}`;

    const response = await AxiosInstance.put(`/summary/edit?${query}`, undefined, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const rawSummary = snakeToCamel<RawSummary>(response.data);
    const resultSummary = getFullSummary(rawSummary, admin.summary.audio);

    return resultSummary;
  }
);

const deleteSummary = createAsyncThunk<void, number, AsyncThunkConfig>(
  'summary/deleteSummary',
  async (summaryId, {getState}) => {
    const {user, summary} = getState();

    await AxiosInstance.delete(`/summary/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    if(summary.summary.audio) {
      URL.revokeObjectURL(summary.summary.audio);
    }
  }
);

const getSummaries = createAsyncThunk<SummariesRaw, CollectionParams, AsyncThunkConfig>(
  'summary/getSummaries', 
  async ({page, filter=defaultFilter}, {getState}) => {
    const {user} = getState();

    const customFilter: Filter = {...filter, username: user.user.username};
    const query = getCollectionQuery(page, getFilterWithDates(customFilter));

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

    return summariesWithTotal as SummariesRaw;
  }
);

const getAudioById = createAsyncThunk<string, string | number, AsyncThunkConfig>(
  'summary/getAudioById',
  async (audioId, {getState}) => {
    const {user, summary} = getState();
    
    const response = await AxiosInstance.get(`audio/${audioId}`, {
      headers: {
        Authorization: user.auth.token
      },
      responseType: 'blob'
    });

    if(audioId !== summary.summary.audioId && summary.summary.audio) {
      URL.revokeObjectURL(summary.summary.audio);
    }

    const audioUrl = URL.createObjectURL(response.data);

    return audioUrl as string;
  }
);

export {postRecordFile, getSummary, getSummaries, getAudioById, putSummaryChanges, deleteSummary};
