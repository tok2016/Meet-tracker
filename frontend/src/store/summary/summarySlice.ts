import { createSlice } from '@reduxjs/toolkit';

import SummaryState from '../../utils/types/SummaryState';
import { postRecordFile, getSummary, putSummaryChanges, deleteSummary, getSummaries, getAudioById } from './summaryThunks';
import { isActionWithError } from '../../utils/types/ActionWithError';
import { defaultSummary } from '../../utils/types/Summary';
import { RootState } from '../store';

const initialState: SummaryState = {
  summary: defaultSummary,
  summaries: [],
  total: 0,
  status: 'idle',
  error: undefined
};

const selectSummary = (state: RootState) => state.summary;

const summarySlide = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postRecordFile.fulfilled, (state, action) => {
        state.status = 'success';
        state.summary = action.payload;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.status = 'success';
        state.summary = action.payload;
      })
      .addCase(putSummaryChanges.fulfilled, (state, action) => {
        state.status = 'success';
        state.summary = action.payload;
      })
      .addCase(deleteSummary.fulfilled, (state) => {
        state.status = 'success';
        state.summary = defaultSummary;
      })
      .addCase(getSummaries.fulfilled, (state, action) => {
        state.status = 'success';
        state.summaries = action.payload.summaries;
        state.total = action.payload.total;
      })
      .addCase(getAudioById.fulfilled, (state, action) => {
        state.status = 'success';
        state.summary.audio = action.payload;
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

export default summarySlide.reducer;
export {selectSummary};
