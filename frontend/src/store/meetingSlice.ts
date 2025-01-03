import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import MeetingState from '../types/MeetingState';
import { RootState } from './store';

const selectMeeting = (state: RootState) => state.meeting;

const initialState: MeetingState = {
  meetingUrl: '',
  recordUrl: '',
  status: 'idle',
  error: undefined
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setRecordUrl(state, action: PayloadAction<string>) {
      state.recordUrl = action.payload;
    },
    setMeetingUrl(state, action: PayloadAction<string>) {
      state.meetingUrl = action.payload
    }
  }
});

export default meetingSlice.reducer;
export const {setMeetingUrl, setRecordUrl} = meetingSlice.actions;
export {selectMeeting};
