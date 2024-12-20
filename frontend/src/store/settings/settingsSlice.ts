import { createSlice } from '@reduxjs/toolkit';

import SettingsState from '../../types/SettingsState';
import { defaultLLMSettings } from '../../types/LLMSettings';
import { defaultSTTConfig } from '../../types/STTConfig';
import { RootState } from '../store';
import { getDatabaseSettings, getEmailSettings, getLLMConfigs, getLLMSettings, getSTTConfig, postDatabaseSettings, postEmailSettings, postLLMSettings, postSTTSettings } from './settingsThunks';
import { isActionWithError } from '../../types/ActionWithError';
import defaultLLMConfigs from '../../utils/defaultLLMs.json';
import { defaultEmailSettings } from '../../types/EmailSettings';
import { defaultDatabaseSettings } from '../../types/DatabaseSettings';
import { DefaultErrors, getErrorMessage } from '../../utils/Error';
import { GET_EMAIL_ERRORS, GET_LLM_ERRORS, GET_STT_ERRORS, POST_EMAIL_ERRORS, POST_LLM_ERRORS, POST_STT_ERRORS } from './settingsErorrs';

const selectSettings = (state: RootState) => state.settings;

const initialState: SettingsState = {
  llm: defaultLLMSettings,
  llms: defaultLLMConfigs,
  stt: defaultSTTConfig,
  email: defaultEmailSettings,
  database: defaultDatabaseSettings,
  status: 'idle',
  error: undefined,
  llmError: undefined,
  sttError: undefined
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postLLMSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.llm = action.payload;
      })
      .addCase(postLLMSettings.rejected, (state, action) => {
        state.status = 'error';
        state.llmError = getErrorMessage(POST_LLM_ERRORS, action.error.code);
      })
      .addCase(getLLMSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.llm = action.payload;
      })
      .addCase(getLLMSettings.rejected, (state, action) => {
        state.status = 'error';
        state.llmError = getErrorMessage(GET_LLM_ERRORS, action.error.code);
      })
      .addCase(getLLMConfigs.fulfilled, (state, action) => {
        state.status = 'success';
        state.llms = action.payload;
      })
      .addCase(getLLMConfigs.rejected, (state) => {
        state.status = 'error';
        state.llmError = undefined;
      })
      .addCase(postSTTSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.stt = action.payload;
      })
      .addCase(postSTTSettings.rejected, (state, action) => {
        state.status = 'error';
        state.sttError = getErrorMessage(POST_STT_ERRORS, action.error.code);
      })
      .addCase(getSTTConfig.fulfilled, (state, action) => {
        state.status = 'success';
        state.stt = action.payload;
      })
      .addCase(getSTTConfig.rejected, (state, action) => {
        state.status = 'error';
        state.sttError = getErrorMessage(GET_STT_ERRORS, action.error.code);
      })
      .addCase(postEmailSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.email = action.payload;
      })
      .addCase(postEmailSettings.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(POST_EMAIL_ERRORS, action.error.code);
      })
      .addCase(getEmailSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.email = action.payload;
      })
      .addCase(getEmailSettings.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(GET_EMAIL_ERRORS, action.error.code);
      })
      .addCase(postDatabaseSettings.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(getDatabaseSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.database = action.payload;
      })
      .addDefaultCase((state, action) => {
        const endpoints = action.type.split('/');
        const status = endpoints[endpoints.length - 1];
        const type = endpoints[endpoints.length - 2];

        if(isActionWithError(action)) {
          state.status = 'error';
          state.error = DefaultErrors['ERR_INTERNET_SERVER_ERROR'];
        } else {
          state.status = status === 'pending' ? 'pending' : 'idle';

          if(type?.includes('Llm')) {
            state.llmError = undefined;
          } else if(type?.includes('Stt')) {
            state.sttError = undefined;
          } else {
            state.error = undefined;
          }
        }
      })
  }
});

export default settingsSlice.reducer;
export {selectSettings};
