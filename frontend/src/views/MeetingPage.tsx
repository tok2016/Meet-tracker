import { JaaSMeeting } from '@jitsi/react-sdk';
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
    <JaaSMeeting
      appId={'vpaas-magic-cookie-b4a7367d0d644887a6de4a3244493ab5'}
      roomName={room.name}
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        recordings: {
          // IF true (default) recording audio and video is selected by default in the recording dialog.
          recordAudioAndVideo: true,
    //    // If true, shows a notification at the start of the meeting with a call to action button
    //    // to start recording (for users who can do so).
          suggestRecording: true,
    //    // If true, shows a warning label in the prejoin screen to point out the possibility that
    //    // the call you're joining might be recorded.
          showPrejoinWarning: true,
    //    // If true, the notification for recording start will display a link to download the cloud recording.
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
