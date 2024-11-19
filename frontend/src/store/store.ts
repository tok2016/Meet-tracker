import { configureStore } from '@reduxjs/toolkit';

import UserReducers from './user/userSlice';
import SummaryReducers from './summary/summarySlice';
import AdminReducers from './admin/adminSlice';
import TimeCodeReducers from './timeCodeSlice';

const store = configureStore({
  reducer: {
    user: UserReducers,
    summary: SummaryReducers,
    admin: AdminReducers,
    timeCode: TimeCodeReducers
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AsyncThunkConfig = { dispath: AppDispatch, state: RootState };
