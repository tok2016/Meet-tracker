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

const selectSettings = (state: RootState) => state.settings;

const initialState: SettingsState = {
  llm: defaultLLMSettings,
  llms: defaultLLMConfigs,
  stt: defaultSTTConfig,
  email: defaultEmailSettings,
  database: defaultDatabaseSettings,
  status: 'idle',
  error: undefined
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postLLMSettings.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(getLLMSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.llm = action.payload;
      })
      .addCase(getLLMConfigs.fulfilled, (state, action) => {
        state.status = 'success';
        state.llms = action.payload;
      })
      .addCase(postSTTSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.stt = action.payload;
      })
      .addCase(getSTTConfig.fulfilled, (state, action) => {
        state.status = 'success';
        state.stt = action.payload;
      })
      .addCase(postEmailSettings.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(getEmailSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.email = action.payload;
      })
      .addCase(postDatabaseSettings.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(getDatabaseSettings.fulfilled, (state, action) => {
        state.status = 'success';
        state.database = action.payload;
      })
      .addDefaultCase((state, action) => {
        const endpoint = action.type.split('/').pop();

        if(isActionWithError(action)) {
          state.status = 'error';
          state.error = action.error;
        } else {
          state.status = endpoint === 'pending' ? 'pending' : 'idle';
          state.error = undefined;
        }
      })
  }
});

export default settingsSlice.reducer;
export {selectSettings};
