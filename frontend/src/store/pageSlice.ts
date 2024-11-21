import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectDefaultPage = (state: RootState) => state.page;

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    defaultPage: '/account'
  },
  reducers: {
    setDefaultPage(state, action) {
      const path = action.payload === '/login' || action.payload === '/register' || action.payload === '/' 
        ? state.defaultPage 
        : action.payload;
      state.defaultPage = path;
    }
  }
});

export default pageSlice.reducer;
export const {setDefaultPage} = pageSlice.actions;
export {selectDefaultPage};
