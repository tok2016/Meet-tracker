import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectTimeCode = (state: RootState) => state.timeCode;

const timeCodeSlice = createSlice({
  name: 'timeCode',
  initialState: {
    timeCode: 0
  },
  reducers: {
    setTimeCode(state, action) {
      state.timeCode = action.payload;
    }
  }
});

export default timeCodeSlice.reducer;
export const {setTimeCode} = timeCodeSlice.actions;
export {selectTimeCode};
