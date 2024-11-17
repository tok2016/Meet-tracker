import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../store';
import AxiosInstance from '../../utils/Axios';
import { arraySnakeToCamel, getCollectionQuery, getFullSummaries, getFullSummary, snakeToCamel } from '../../utils/utils';
import Summary, { SummariesRaw, SummaryUpdate, RawSummary } from '../../utils/types/Summary';
import CollectionData from '../../utils/types/CollectionData';
import Filter, { defaultFilter } from '../../utils/types/Filter';
import CollectionParams from '../../utils/types/CollectionParams';
import RecordQuery from '../../utils/types/RecordQuery';
//import mockSummary from './example.json';

const RECORD_UPLOAD_TIMEOUT = 1000 * 60 * 5;

const postRecordFile = createAsyncThunk<Summary, RecordQuery, AsyncThunkConfig>(
  'summary/postRecordFile',
  async ({file, title}, {getState}) => {
    const formData = new FormData();

    const {user} = getState();

    const finalFile = new File([file], 'audio', {type: file.type});

    formData.append('file', finalFile);

    const response = await AxiosInstance.post(`/record/diarize?title=${title}`, formData, {
      timeout: RECORD_UPLOAD_TIMEOUT,
      headers: {
        Authorization: user.auth.token,
        'Content-Type': 'multipart/fromData'
      },
    });

    const rawSummary = snakeToCamel<RawSummary>(response.data);
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

    const rawSummary = snakeToCamel<RawSummary>(response.data.Summary);
    const summary = getFullSummary(rawSummary);

    return summary;
  }
);

const putSummaryChanges = createAsyncThunk<Summary, SummaryUpdate, AsyncThunkConfig>(
  'summary/putSummaryChanges',
  async (summaryUpdate, {getState}) => {
    const {user} = getState();

    const query = `summary_id=${summaryUpdate.id}&text_input=${summaryUpdate.text[0].text}`;

    const response = await AxiosInstance.put(`/summary/edit?${query}`, undefined, {
      headers: {
        Authorization: user.auth.token
      }
    });
    
    const rawSummary = snakeToCamel<RawSummary>(response.data);
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

const getSummaries = createAsyncThunk<SummariesRaw, CollectionParams, AsyncThunkConfig>(
  'summary/getSummaries', 
  async ({page, filter=defaultFilter}, {getState}) => {
    const {user} = getState();

    const customFilter: Filter = {...filter, username: user.user.username};
    const query = getCollectionQuery(page, customFilter);

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

    return summariesWithTotal as SummariesRaw;
  }
);

export {postRecordFile, getSummary, putSummaryChanges, deleteSummary, getSummaries};
