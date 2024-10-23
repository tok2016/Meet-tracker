import { configureStore } from '@reduxjs/toolkit';

import UserReducers from './userSlice';

const store = configureStore({
  reducer: {
    user: UserReducers
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AsyncThunkConfig = { dispath: AppDispatch, state: RootState };
