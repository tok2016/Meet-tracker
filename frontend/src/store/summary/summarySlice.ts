import { createSlice } from '@reduxjs/toolkit';

import { Record } from '../../utils/types/Record';
import SummaryState from '../../utils/types/SummaryState';
import { postRecordFile, getSummary, putSummaryChanges, deleteSummary, getSummaries, postRecordFileTest } from './summaryThunks';
import { isActionWithError } from '../../utils/types/ActionWithError';
import { Summary } from '../../utils/types/Summary';
import { RootState } from '../store';

const defaultRecord: Record = {
  id: 0,
  file: '',
  userId: 0,
  isArchived: false
};

const defaultSummary: Summary = {
  id: 0,
  userId: 0,
  title: '',
  text: '',
  date: (new Date()).toString(),
  record: defaultRecord,
  status: 'idle'
};

const initialState: SummaryState = {
  summary: defaultSummary,
  summaries: [],
  total: 0,
  status: 'idle',
  error: undefined,
  summaryTest: ''
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
      .addCase(postRecordFileTest.fulfilled, (state, action) => {
        state.status = 'success';
        state.summaryTest = action.payload;
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
