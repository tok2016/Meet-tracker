import DefaultState from './DefaultState';
import Room from './Room';

export default interface MeetingState extends DefaultState {
  recordUrl: string,
  meetingUrl: string,
  room: Room
};
