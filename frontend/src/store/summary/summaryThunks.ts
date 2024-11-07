import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../store';
import AxiosInstance from '../../utils/Axios';
import { camelToSnake, snakeToCamel } from '../../utils/utils';
import Summary, { SummaryContent, SummariesRaw, SummaryInfo, SummaryUpdate, RawSummaryContent, RawSummary } from '../../utils/types/Summary';
import TopicContent, { isTopicContent } from '../../utils/types/TopicContent';
//import mockSummary from './example.json';

const RECORD_UPLOAD_TIMEOUT = 1000 * 60 * 5;

const parseTopicContent = (content: string): TopicContent => {
  const stringEntry = content.split(/\w+[a-z][=]/g).find((s) => s.includes('topic'));
  const stringJsonSingular = stringEntry?.match(/{.{1,}}/g);
  const stringJson = stringJsonSingular ? stringJsonSingular[0].replace(/'/g, '"') : '';
  const rawContent = JSON.parse(stringJson);

  const defaultContent: TopicContent = {
    topic: '',
    text: '',
    start: '',
    end: '',
    speakers: ''
  };

  return isTopicContent(rawContent['args']) ? rawContent['args'] as TopicContent : defaultContent;
}

const getSummaryContent = (rawContent: RawSummaryContent): SummaryContent => {
  const topics = Object.entries(rawContent);

  const result: SummaryContent = {};

  topics.forEach((pair) => {
    result[pair[0] as keyof SummaryContent] = parseTopicContent(pair[1]);
  });

  return result;
};

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

    const finalFile = new File([file], `${user.user.username}_${Date.now()}`, {type: file.type});

    const path = `app/sounds/${finalFile.name}`;

    formData.append('file_path', finalFile);

    const response = await AxiosInstance.post(`/record/diarize?file_name=${path}`, formData, {
      timeout: RECORD_UPLOAD_TIMEOUT,
      headers: {
        Authorization: user.auth.token,
        'Content-Type': 'multipart/fromData'
      },
    });

    const content = getSummaryContent(response.data);

    const summary: Summary = {
      id: 1,
      userId: 1,
      title: 'Meeting 1',
      date: new Date().toISOString(),
      text: content,
      status: 'success',
      record: {
        id: 1,
        userId: 1,
        file: '',
        isArchived: false
      }
    }

    return summary;
  }
);

const getSummary = createAsyncThunk<Summary, string | number, AsyncThunkConfig>(
  'summary/getSummary',
  async (summaryId, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get(`/summary/${summaryId}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(response.data) as Summary;
  }
);

const putSummaryChanges = createAsyncThunk<Summary, SummaryUpdate, AsyncThunkConfig>(
  'summary/putSummaryChanges',
  async (summaryUpdate, {getState}) => {
    const {user} = getState();
    const body = camelToSnake(summaryUpdate);

    const response = await AxiosInstance.put(`/summary/${summaryUpdate.id}`, body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel(response.data) as Summary;
  }
);

const deleteSummary = createAsyncThunk<void, string | number, AsyncThunkConfig>(
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

    const response = await AxiosInstance.get(`/summaries?page=${page}`, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const summaries = (response.data.summaries as object[]).map((summary) => snakeToCamel(summary)) as SummaryInfo[];

    const summariesWithTotal: SummariesRaw = {
      summaries,
      total: response.data.total ? response.data.total : summaries.length
    };

    return summariesWithTotal as SummariesRaw;
  }
);

export {postRecordFile, getSummary, putSummaryChanges, deleteSummary, getSummaries, postRecordFileTest};
