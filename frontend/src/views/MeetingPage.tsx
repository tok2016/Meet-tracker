import { JitsiMeeting } from '@jitsi/react-sdk';
import { IJitsiMeetExternalApi } from '@jitsi/react-sdk/lib/types';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectMeeting, setMeetingUrl, setRecordUrl } from '../store/meetingSlice';
import { selectUser } from '../store/user/userSlice';

const MeetingPage = () => {
  const {user} = useAppSelector(selectUser);
  const {room} = useAppSelector(selectMeeting);
  const dispatch = useAppDispatch();

  const apiRef = useRef<IJitsiMeetExternalApi | null>(null);
  const iframeRef = useRef<HTMLDivElement | null>(null);

  const displayName = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName;

  const onRecordingLinkAvailable = (payload: {link: string, ttl: number}) => {
    console.log(payload.link);
    dispatch(setRecordUrl(payload.link));
  };

  const getMeetingUrl = async () => {
    const url = await apiRef.current?.getLivestreamUrl();
    dispatch(setMeetingUrl(url ?? ''));
  };

  const onReadyToClose = () => {
    apiRef.current?.stopRecording('file');
  };

  const onApiReady = (api: IJitsiMeetExternalApi) => {
    apiRef.current = api;
    getMeetingUrl();

    apiRef.current.on('recordingLinkAvailable', onRecordingLinkAvailable);
  };

  const onIframeGet = (iframe: HTMLDivElement) => {
    iframeRef.current = iframe;
    iframeRef.current.style.height = '100vh';
  };

  return (
    <JitsiMeeting
      roomName={room.name}
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        recordings: {
          recordAudioAndVideo: true,
          suggestRecording: true,
          showPrejoinWarning: true,
          showRecordingLink: true,
        }
      }}
      interfaceConfigOverwrite={{
        DISABLE_TRANSCRIPTION_SUBTITLES: true
      }}
      lang='ru'
      userInfo={{
        displayName,
        email: user.email
      }}
      onApiReady={onApiReady}
      onReadyToClose={onReadyToClose}
      getIFrameRef={onIframeGet} />
  );
};

export default MeetingPage;
