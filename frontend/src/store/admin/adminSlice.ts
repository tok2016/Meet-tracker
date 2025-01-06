import { createSlice } from '@reduxjs/toolkit';

import AdminState from '../../types/AdminState';
import { archiveRecordById, deleteRecordById, deleteSummaryById, deleteUserById, getAllSummaries, getUserAvatar, 
  getUserById, getUsers, patchUserById, postNewPasswordById, postNewUser, postUserAvatar} from './adminThunks';
import { isActionWithError } from '../../types/ActionWithError';
import { defaultUser } from '../../types/User';
import { defaultSummary } from '../../types/Summary';
import { RootState } from '../store';
import { DefaultErrors, getErrorMessage } from '../../utils/Error';
import { ARCHIVE_ERRORS, DELETE_USER_ERRORS, GET_USERS_ERRORS } from './adminErrors';
import { AVATAR_GET_ERRORS, AVATAR_POST_ERRORS, GET_USER_ERRORS, PATCH_USER_ERRORS, REGISTER_ERRORS, USER_PASSWORD_ERRORS } from '../user/userErrors';
import { SUMMARY_DELETE_ERRORS, SUMMARY_LIST_ERRORS } from '../summary/summaryErrors';

const initialState: AdminState = {
  users: [],
  summaries: [],
  usersTotal: 0,
  summariesTotal: 0,
  user: defaultUser,
  summary: defaultSummary,
  status: 'idle',
  error: undefined,
  userError: undefined,
  summaryError: undefined
}

const selectAdminData = (state: RootState) => state.admin;

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    hideListError(state) {
      state.error = undefined;
      state.userError = undefined;
      state.summaryError = undefined;
    },
    clearError(state) {
      state.error = '';
      state.userError = '';
      state.summaryError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.users = action.payload.users;
        state.usersTotal = action.payload.total;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'error';
        state.users = [];
        state.error = getErrorMessage(GET_USERS_ERRORS, action.error.code);
      })
      .addCase(postNewUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(postNewUser.rejected, (state, action) => {
        state.status = 'error';
        state.userError = getErrorMessage(REGISTER_ERRORS, action.error.code);

        if(state.user.avatar) {
          URL.revokeObjectURL(state.user.avatar);
        }
        state.user = defaultUser;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'error';
        state.userError = getErrorMessage(GET_USER_ERRORS, action.error.code);

        if(state.user.avatar) {
          URL.revokeObjectURL(state.user.avatar);
        }
        state.user = defaultUser;
      })
      .addCase(patchUserById.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(patchUserById.rejected, (state, action) => {
        state.status = 'error';
        state.userError = getErrorMessage(PATCH_USER_ERRORS, action.error.code);
      })
      .addCase(deleteUserById.fulfilled, (state) => {
        state.status = 'success';
        state.user = defaultUser;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = 'error';
        state.userError = getErrorMessage(DELETE_USER_ERRORS, action.error.code);
      })
      .addCase(postUserAvatar.fulfilled, (state, action) => {
        state.status = 'success',
        state.user.avatar = action.payload;
      })
      .addCase(postUserAvatar.rejected, (state, action) => {
        state.status = 'error';
        state.userError = getErrorMessage(AVATAR_POST_ERRORS, action.error.code);
      })
      .addCase(getUserAvatar.fulfilled, (state, action) => {
        state.status = 'success';
        state.user.avatar = action.payload;
      })
      .addCase(getUserAvatar.rejected, (state, action) => {
        state.status = 'error';
        state.userError = getErrorMessage(AVATAR_GET_ERRORS, action.error.code);

        if(state.user.avatar) {
          URL.revokeObjectURL(state.user.avatar);
        }
        state.user.avatar = '';
      })
      .addCase(postNewPasswordById.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(postNewPasswordById.rejected, (state, action) => {
        state.status = 'error';
        state.userError = getErrorMessage(USER_PASSWORD_ERRORS, action.error.code);
      })
      .addCase(getAllSummaries.fulfilled, (state, action) => {
        state.status = 'success';
        state.summaries = action.payload.summaries;
        state.summariesTotal = action.payload.total;
      })
      .addCase(getAllSummaries.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(SUMMARY_LIST_ERRORS, action.error.code);
        state.summaries = [];
      })
      .addCase(deleteSummaryById.fulfilled, (state) => {
        state.status = 'success';
        state.summary = defaultSummary;
      })
      .addCase(deleteSummaryById.rejected, (state, action) => {
        state.status = 'error';
        state.summaryError = getErrorMessage(SUMMARY_DELETE_ERRORS, action.error.code);
      })
      .addCase(archiveRecordById.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(archiveRecordById.rejected, (state, action) => {
        state.status = 'error';
        state.summaryError = getErrorMessage(ARCHIVE_ERRORS, action.error.code);
      })
      .addCase(deleteRecordById.fulfilled, (state) => {
        state.status = 'success';
        state.summary.audio = '';
      })
      .addCase(deleteRecordById.rejected, (state, action) => {
        state.status = 'error';
        state.summaryError = getErrorMessage(SUMMARY_DELETE_ERRORS, action.error.code);
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

export default adminSlice.reducer;
export const {hideListError, clearError: clearAdminError} = adminSlice.actions;
export {selectAdminData};
