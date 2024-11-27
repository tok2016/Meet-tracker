import { createSlice } from '@reduxjs/toolkit';

import AdminState from '../../types/AdminState';
import { archiveRecordById, deleteRecordById, deleteSummaryById, deleteUserById, getAllSummaries, getUserAvatar, 
  getUserById, getUsers, patchUserById, postNewUser, postUserAvatar} from './adminThunks';
import { isActionWithError } from '../../types/ActionWithError';
import { defaultUser } from '../../types/User';
import { defaultSummary } from '../../types/Summary';
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
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(patchUserById.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(deleteUserById.fulfilled, (state) => {
        state.status = 'success';
        state.user = defaultUser;
      })
      .addCase(postUserAvatar.fulfilled, (state, action) => {
        state.status = 'success',
        state.user.avatar = action.payload;
      })
      .addCase(getUserAvatar.fulfilled, (state, action) => {
        state.status = 'success';
        state.user.avatar = action.payload;
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
      .addCase(archiveRecordById.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(deleteRecordById.fulfilled, (state) => {
        state.status = 'success';
        state.summary.audio = '';
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
