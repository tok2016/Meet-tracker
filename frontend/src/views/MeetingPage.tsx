import { JitsiMeeting } from '@jitsi/react-sdk';
import { IJitsiMeetExternalApi } from '@jitsi/react-sdk/lib/types';
import { useRef } from 'react';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { setMeetingUrl, setRecordUrl } from '../store/meetingSlice';

const MeetingPage = () => {
  const dispatch = useAppDispatch();

  const apiRef = useRef<IJitsiMeetExternalApi | null>(null);

  const onRecordingLinkAvailable = (payload: {link: string, ttl: number}) => {
    dispatch(setRecordUrl(payload.link));
  };

  const onReadyToClose = () => {
    apiRef.current?.stopRecording('file');
  };

  const getMeetingUrl = async () => {
    const url = await apiRef.current?.getLivestreamUrl();
    dispatch(setMeetingUrl(url ?? ''));
  };

  const onApiReady = (api: IJitsiMeetExternalApi) => {
    apiRef.current = api;
    getMeetingUrl();

    apiRef.current.on('recordingLinkAvailable', onRecordingLinkAvailable);
    apiRef.current.startRecording({
      mode: 'file',
      dropboxToken: '',
      shouldShare: true,
      rtmpStreamKey: '',
      rtmpBroadcastID: '',
      youtubeStreamKey: '',
      youtubeBroadcastID: ''
    });
  };

  return (
    <JitsiMeeting
      roomName='room1'
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: true
      }}
      interfaceConfigOverwrite={{
        DISABLE_TRANSCRIPTION_SUBTITLES: true
      }}
      lang='ru'
      userInfo={{
        displayName: 'a',
        email: 'a'
      }}
      onApiReady={onApiReady}
      onReadyToClose={onReadyToClose} />
  );
};

export default MeetingPage;
