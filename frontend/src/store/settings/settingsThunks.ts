import { createAsyncThunk } from '@reduxjs/toolkit';

import LLMSettings, { LLMSettingsRaw } from '../../types/LLMSettings';
import { AsyncThunkConfig } from '../store';
import { arraySnakeToCamel, camelToSnake, snakeToCamel } from '../../utils/utils';
import AxiosInstance from '../../utils/Axios';
import LLMConfig from '../../types/LLMConfig';
import STTConfig from '../../types/STTConfig';

const postLLMSettings = createAsyncThunk<LLMSettings, LLMSettings, AsyncThunkConfig>(
  'settings/postLLMSettings',
  async (llmSettings, {getState}) => {
    const {user} = getState();

    const finalSettings: LLMSettingsRaw = {
      ...llmSettings, 
      summaryStructure: JSON.stringify(llmSettings.summaryStructure)
    };
    const body = camelToSnake(finalSettings);

    const response = await AxiosInstance.post('/llmSettings', body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    const validatedSettingsRaw = snakeToCamel<LLMSettingsRaw>(response.data);
    const validatedSettings: LLMSettings = {
      ...validatedSettingsRaw, 
      summaryStructure: JSON.parse(validatedSettingsRaw.summaryStructure)
    };

    return validatedSettings;
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

    const validatedSettingsRaw = snakeToCamel<LLMSettingsRaw>(response.data);
    const validatedSettings: LLMSettings = {
      ...validatedSettingsRaw, 
      summaryStructure: JSON.parse(validatedSettingsRaw.summaryStructure)
    };

    return validatedSettings;
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

    const response = await AxiosInstance.post('/sttConfig', body, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<STTConfig>(response.data);
  }
);

const getSTTConfig = createAsyncThunk<STTConfig, void, AsyncThunkConfig>(
  'settings/getSTTConfig',
  async (_, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get('/sttConfig', {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<STTConfig>(response.data); 
  }
);

export {getLLMConfigs, getLLMSettings, getSTTConfig, postLLMSettings, postSTTSettings};
