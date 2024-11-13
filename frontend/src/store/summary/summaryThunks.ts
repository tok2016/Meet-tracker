import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../store';
import AxiosInstance from '../../utils/Axios';
import { arraySnakeToCamel, getFullSummaries, getFullSummary, getOffsetQuery, getSummaryContent, snakeToCamel } from '../../utils/utils';
import Summary, { SummariesRaw, SummaryUpdate, RawSummary, SmallSummary } from '../../utils/types/Summary';
//import mockSummary from './example.json';

const RECORD_UPLOAD_TIMEOUT = 1000 * 60 * 5;

const postRecordFile = createAsyncThunk<Summary, File, AsyncThunkConfig>(
  'summary/postRecordFile',
  async (file, {getState}) => {
    const formData = new FormData();

    const {user} = getState();

    const finalFile = new File([file], `${user.user.username}_${Date.now()}`, {type: file.type});
    const path = `${import.meta.env.AUDIO_STORAGE}${finalFile.name}`;

    formData.append('file_path', finalFile);

    const response = await AxiosInstance.post(`/record/diarize?file_name=${path}`, formData, {
      timeout: RECORD_UPLOAD_TIMEOUT,
      headers: {
        Authorization: user.auth.token,
        'Content-Type': 'multipart/fromData'
      },
    });

    const rawSummary = snakeToCamel(response.data) as RawSummary;
    const summary: Summary = {
      ...rawSummary,
      text: getSummaryContent(rawSummary.text)
    }

    return summary;
  }
);

const postRecordFileTest = createAsyncThunk<Summary, File, AsyncThunkConfig>(
  'summary/postRecordFileTest',
  async (file, {getState}) => {
    const formData = new FormData();

    const {user} = getState();

    const finalFile = new File([file], 'audio', {type: file.type});

    formData.append('file', finalFile);

    const response = await AxiosInstance.post('/record/diarize', formData, {
      timeout: RECORD_UPLOAD_TIMEOUT,
      headers: {
        Authorization: user.auth.token,
        'Content-Type': 'multipart/fromData'
      },
    });

    const rawSummary = snakeToCamel(response.data.Summary) as SmallSummary;
    const summary = getFullSummary(rawSummary);

    return summary;
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

    const rawSummary = snakeToCamel(response.data.Summary) as SmallSummary;
    const summary = getFullSummary(rawSummary);

    return summary;
  }
);

const putSummaryChanges = createAsyncThunk<Summary, SummaryUpdate, AsyncThunkConfig>(
  'summary/putSummaryChanges',
  async (summaryUpdate, {getState}) => {
    const {user} = getState();
    //const body = JSON.stringify(camelToSnake(summaryUpdate));

    const query = `summary_id=${summaryUpdate.id}&text_input=${summaryUpdate.text['Общая информация'].text}`;

    const response = await AxiosInstance.put(`/summary/edit?${query}`, undefined, {
      headers: {
        Authorization: user.auth.token
      }
    });
    
    const rawSummary = snakeToCamel(response.data) as SmallSummary;
    const summary = getFullSummary(rawSummary);

    return summary;
  }
);

const deleteSummary = createAsyncThunk<void, number, AsyncThunkConfig>(
  'summary/deleteSummary',
  async (summaryId, {getState}) => {
    const {user} = getState();

    await AxiosInstance.delete(`/summary/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

const getSummaries = createAsyncThunk<SummariesRaw, number, AsyncThunkConfig>(
  'summary/getSummaries', 
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
      total: response.data.total ? response.data.total : summaries.length
    };

    return summariesWithTotal as SummariesRaw;
  }
);

export {postRecordFile, getSummary, putSummaryChanges, deleteSummary, getSummaries, postRecordFileTest};
