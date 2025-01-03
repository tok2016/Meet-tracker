import DefaultState from './DefaultState';

export default interface MeetingState extends DefaultState {
  recordUrl: string,
  meetingUrl: string
};
