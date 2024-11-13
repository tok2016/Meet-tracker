import { createSlice } from '@reduxjs/toolkit';

import AdminState from '../../utils/types/AdminState';
import { deleteRecordById, deleteSummaryById, deleteUserByUsername, getAllSummaries, 
  getUserByUsername, getUsers, patchUserByUsername, postNewUser } from './adminThunks';
import { isActionWithError } from '../../utils/types/ActionWithError';
import { defaultUser } from '../../utils/types/User';
import { defaultRecord, defaultSummary } from '../../utils/types/Summary';
import { RootState } from '../store';

const initialState: AdminState = {
  users: [],
  summaries: [],
  usersTotal: 0,
  summariesTotal: 0,
  user: defaultUser,
  summary: defaultSummary,
  status: 'idle',
  error: undefined
}

const selectAdminData = (state: RootState) => state.admin;

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.users = action.payload.users;
        state.usersTotal = action.payload.total;
      })
      .addCase(postNewUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(patchUserByUsername.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(deleteUserByUsername.fulfilled, (state) => {
        state.status = 'success';
        state.user = defaultUser;
      })
      .addCase(getAllSummaries.fulfilled, (state, action) => {
        state.status = 'success';
        state.summaries = action.payload.summaries;
        state.summariesTotal = action.payload.total;
      })
      .addCase(deleteSummaryById.fulfilled, (state) => {
        state.status = 'success';
        state.summary = defaultSummary;
      })
      .addCase(deleteRecordById.fulfilled, (state) => {
        state.status = 'success';
        state.summary = {...state.summary, record: defaultRecord, audioId: 0};
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

export default adminSlice.reducer;
export {selectAdminData};
