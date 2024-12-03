import { createAsyncThunk } from '@reduxjs/toolkit';

import LLMSettings from '../../types/LLMSettings';
import { AsyncThunkConfig } from '../store';
import { arraySnakeToCamel, camelToSnake, snakeToCamel } from '../../utils/utils';
import AxiosInstance from '../../utils/Axios';
import LLMConfig from '../../types/LLMConfig';
import STTConfig from '../../types/STTConfig';

const postLLMSettings = createAsyncThunk<LLMSettings, LLMSettings, AsyncThunkConfig>(
  'settings/postLLMSettings',
  async (llmSettings, {getState}) => {
    const {user} = getState();

    const body = camelToSnake(llmSettings);

    const response = await AxiosInstance.post('/llmSettings', body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<LLMSettings>(response.data);
  }
);

const getLLMSettings = createAsyncThunk<LLMSettings, void, AsyncThunkConfig>(
  'settings/getLLMSettings',
  async (_, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get('/llmSettings', {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<LLMSettings>(response.data);
  }
);

const getLLMConfigs = createAsyncThunk<LLMConfig[], void, AsyncThunkConfig>(
  'settings/getLLMConfigs',
  async (_, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get('/llmConfigs', {
      headers: {
        Authorization: user.auth.token
      }
    });

    return arraySnakeToCamel<LLMConfig>(response.data);
  }
);

const postSTTSettings = createAsyncThunk<STTConfig, STTConfig, AsyncThunkConfig>(
  'settings/postSTTSettings',
  async (sttConfig, {getState}) => {
    const {user} = getState();

    const body = camelToSnake(sttConfig);

    const sttResponse = await AxiosInstance.post('/sttSettings', body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const diarizeResponse = await AxiosInstance.post('/diarizeSettings', body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const response = {...sttResponse.data, ...diarizeResponse.data};

    return snakeToCamel<STTConfig>(response);
  }
);

const getSTTConfig = createAsyncThunk<STTConfig, void, AsyncThunkConfig>(
  'settings/getSTTConfig',
  async (_, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get('/settings', {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<STTConfig>(response.data); 
  }
);

export {getLLMConfigs, getLLMSettings, getSTTConfig, postLLMSettings, postSTTSettings};
