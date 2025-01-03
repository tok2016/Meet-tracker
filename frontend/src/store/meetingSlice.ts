import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import MeetingState from '../types/MeetingState';
import { RootState } from './store';
import Room from '../types/Room';

const selectMeeting = (state: RootState) => state.meeting;

const initialState: MeetingState = {
  meetingUrl: '',
  recordUrl: '',
  room: {
    id: '',
    name: '',
    isAutoRecording: true
  },
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
    },
    createRoom(state, action: PayloadAction<Room>) {
      state.room = action.payload;
    }
  }
});

export default meetingSlice.reducer;
export const {setMeetingUrl, setRecordUrl, createRoom} = meetingSlice.actions;
export {selectMeeting};
