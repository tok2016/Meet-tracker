import { createSlice } from '@reduxjs/toolkit';

import SummaryState from '../../types/SummaryState';
import { postRecordFile, getSummary, putSummaryChanges, deleteSummary, getSummaries, getAudioById, getSummaryFile } from './summaryThunks';
import { isActionWithError } from '../../types/ActionWithError';
import { defaultSummary } from '../../types/Summary';
import { RootState } from '../store';
import { DefaultErrors, getErrorMessage } from '../../utils/Error';
import { RECORD_ERRORS, SUMMARY_AUDIO_ERRORS, SUMMARY_DELETE_ERRORS, SUMMARY_FILE_ERRORS, SUMMARY_LIST_ERRORS, SUMMRY_GET_ERRORS, SUMMRY_PUT_ERRORS } from './summaryErrors';

const initialState: SummaryState = {
  summary: defaultSummary,
  summaries: [],
  total: 0,
  status: 'idle',
  error: undefined,
  recordError: undefined,
  listStatus: 'idle',
  listError: undefined,
  fileStatus: 'idle',
  audioStatus: 'idle'
};

const selectSummary = (state: RootState) => state.summary;

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
      state.listError = '';
      state.recordError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postRecordFile.pending, (state) => {
        state.status = 'pending';
        state.recordError = undefined
      })
      .addCase(postRecordFile.fulfilled, (state, action) => {
        state.status = 'success';
        state.summary = action.payload;
      })
      .addCase(postRecordFile.rejected, (state, action) => {
        state.status = 'error';
        state.recordError = getErrorMessage(RECORD_ERRORS, action.error.code);
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.status = 'success';
        state.summary = action.payload;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.status = 'error';
        state.summary = defaultSummary;
        state.error = getErrorMessage(SUMMRY_GET_ERRORS, action.error.code);
      })
      .addCase(putSummaryChanges.fulfilled, (state, action) => {
        state.status = 'success';
        state.summary = action.payload;
      })
      .addCase(putSummaryChanges.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(SUMMRY_PUT_ERRORS, action.error.code);
      })
      .addCase(deleteSummary.fulfilled, (state) => {
        state.status = 'success';
        state.summary = defaultSummary;
      })
      .addCase(deleteSummary.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(SUMMARY_DELETE_ERRORS, action.error.code);
      })
      .addCase(getSummaries.pending, (state) => {
        state.listStatus = 'pending';
        state.listError = undefined;
      })
      .addCase(getSummaries.fulfilled, (state, action) => {
        state.listStatus = 'success';
        state.summaries = action.payload.summaries;
        state.total = action.payload.total;
      })
      .addCase(getSummaries.rejected, (state, action) => {
        state.listStatus = 'error';
        state.error = getErrorMessage(SUMMARY_LIST_ERRORS, action.error.code);
        state.summaries = [];
      })
      .addCase(getAudioById.pending, (state) => {
        state.audioStatus = 'pending';
        state.error = undefined;
      })
      .addCase(getAudioById.fulfilled, (state, action) => {
        state.audioStatus = 'success';
        state.summary.audio = action.payload;
      })
      .addCase(getAudioById.rejected, (state, action) => {
        state.audioStatus = 'error';

        if(state.summary.audio) {
          URL.revokeObjectURL(state.summary.audio);
        }
        state.summary.audio = '';

        state.error = getErrorMessage(SUMMARY_AUDIO_ERRORS, action.error.code);
      })
      .addCase(getSummaryFile.pending, (state) => {
        state.fileStatus = 'pending';
        state.error = undefined;
      })
      .addCase(getSummaryFile.fulfilled, (state) => {
        state.fileStatus = 'success';
      })
      .addCase(getSummaryFile.rejected, (state, action) => {
        state.fileStatus = 'error';
        state.error = getErrorMessage(SUMMARY_FILE_ERRORS, action.error.code);
      })
      .addDefaultCase((state, action) => {
        const endpoint = action.type.split('/').pop();

        if(isActionWithError(action)) {
          state.status = 'error';
          state.error = DefaultErrors['ERR_INTERNET_SERVER_ERROR'];
        } else {
          state.status = endpoint === 'pending' ? 'pending' : 'idle';
          state.error = undefined;
        }
      })
  }
});

export default summarySlice.reducer;
export const {clearError: clearSummaryError} = summarySlice.actions;
export {selectSummary};
