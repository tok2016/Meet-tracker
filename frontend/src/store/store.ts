import { configureStore } from '@reduxjs/toolkit';

import UserReducers from './user/userSlice';
import SummaryReducers from './summary/summarySlice';
import AdminReducers from './admin/adminSlice';
import TimeCodeReducers from './timeCodeSlice';
import PageReducer from './pageSlice';
import SettingsReducer from './settings/settingsSlice';
import PaletteReducer from './palette/paletteSlice';
import MeetingReducer from './meetingSlice';

const store = configureStore({
  reducer: {
    user: UserReducers,
    summary: SummaryReducers,
    admin: AdminReducers,
    timeCode: TimeCodeReducers,
    page: PageReducer,
    settings: SettingsReducer,
    palette: PaletteReducer,
    meeting: MeetingReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AsyncThunkConfig = { dispath: AppDispatch, state: RootState };
