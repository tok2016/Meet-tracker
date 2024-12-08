import { createAsyncThunk } from '@reduxjs/toolkit';

import LLMSettings from '../../types/LLMSettings';
import { AsyncThunkConfig } from '../store';
import { arraySnakeToCamel, camelToSnake, snakeToCamel } from '../../utils/utils';
import AxiosInstance from '../../utils/Axios';
import LLMConfig from '../../types/LLMConfig';
import STTConfig from '../../types/STTConfig';
import EmailSettings from '../../types/EmailSettings';
import DatabaseSettings, { DatabaseSettingsRaw } from '../../types/DatabaseSettings';
import { TTLUnit, TTLUnitsDays } from '../../types/TTLUnit';

const daysToTTLUnit = (valueInDays: number): DatabaseSettings => {
  let ttlValue = valueInDays;
  let ttlUnit: TTLUnit = 'day';

  Object.entries(TTLUnitsDays).forEach(([unit, daysPerUnit]) => {
    if(ttlValue % daysPerUnit === 0) {
      ttlValue /= daysPerUnit;
      ttlUnit = unit as TTLUnit;
    }
  });

  return {ttlValue, ttlUnit};
};

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

const postDatabaseSettings = createAsyncThunk<void, DatabaseSettings, AsyncThunkConfig>(
  'settings/postDatabaseSettings',
  async (settings, {getState}) => {
    const {user} = getState();

    const body: DatabaseSettingsRaw = {
      ttl: settings.ttlValue * TTLUnitsDays[settings.ttlUnit]
    };

    await AxiosInstance.post('/database', body, {
      headers: {
        Authorization: user.auth.token
      }
    });
  }
);

const getDatabaseSettings = createAsyncThunk<DatabaseSettings, void, AsyncThunkConfig>(
  'settings/getDatabaseSettings',
  async (_, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get('/database', {
      headers: {
        Authorization: user.auth.token
      }
    });

    const settingsRaw = snakeToCamel<DatabaseSettingsRaw>(response.data);
    const settings = daysToTTLUnit(settingsRaw.ttl);

    return settings as DatabaseSettings;
  }
);

const postSettings = <SettingsType extends object, >(path: string, actionType: string) => createAsyncThunk<void, SettingsType, AsyncThunkConfig>(
  `settings/${actionType}`,
  async (settings, {getState}) => {
    const {user} = getState();
    const body = camelToSnake(settings);

    await AxiosInstance.post(path, body, {
      headers: {
        Authorization: user.auth.token
      }
    })
  }
);

const getSettings = <SettingsType extends object, >(path: string, actionType: string) => createAsyncThunk<SettingsType, void, AsyncThunkConfig>(
  `settings/${actionType}`,
  async (_, {getState}) => {
    const {user} = getState();

    const response = await AxiosInstance.get(path, {
      headers: {
        Authorization: user.auth.token
      }
    });

    return snakeToCamel<SettingsType>(response.data);
  }
);

const postLLMSettings = postSettings<LLMSettings>('/llmSettings', 'postLLMSettings');
const getLLMSettings = getSettings<LLMSettings>('/llmSettings', 'getLLMSettings');

const getSTTConfig = getSettings<STTConfig>('/settings', 'getSTTConfig');

const postEmailSettings = postSettings<EmailSettings>('/email', 'postEmailSettings');
const getEmailSettings = getSettings<EmailSettings>('/email', 'getEmailSettings');

export {getLLMConfigs, getLLMSettings, getSTTConfig, getEmailSettings, getDatabaseSettings, 
  postLLMSettings, postSTTSettings, postEmailSettings, postDatabaseSettings};
