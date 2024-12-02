import { createSlice } from '@reduxjs/toolkit';

import SettingsState from '../../types/SettingsState';
import { defaultLLMSettings } from '../../types/LLMSettings';
import { defaultSTTConfig } from '../../types/STTConfig';
import { RootState } from '../store';
import { getColorPalette, getLLMConfigs, getLLMSettings, getSTTConfig, postColorPalette, postLLMSettings, postSTTSettings } from './settingsThunks';
import { isActionWithError } from '../../types/ActionWithError';
import defaultLLMConfigs from '../../utils/defaultLLMs.json';
import UIColors from '../../utils/Colors';

const selectSettings = (state: RootState) => state.settings;

const initialState: SettingsState = {
  llm: defaultLLMSettings,
  llms: defaultLLMConfigs,
  stt: defaultSTTConfig,
  status: 'idle',
  error: undefined
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
      .addCase(postColorPalette.fulfilled, (state, action) => {
        state.status = 'success';
        UIColors.updateColors(action.payload);
      })
      .addCase(getColorPalette.fulfilled, (state, action) => {
        state.status = 'success';
        UIColors.updateColors(action.payload);
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
