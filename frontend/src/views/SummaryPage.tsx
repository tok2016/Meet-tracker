import { Button, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import TopicPlain from '../components/summary/TopicPlain';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getAudioById, getSummary, putSummaryChanges } from '../store/summary/summaryThunks';
import TopicContent, { defaultTopic } from '../types/TopicContent';
import AudioPlayer from '../components/summary/AudioPlayer';
import DownloadButton from '../components/summary/DownloadButton';
import { areObjectsEqual, getPageTitle } from '../utils/utils';
import { breakpoints } from '../theme/BasicTypography';
import Summary from '../types/Summary';
import LocalProgress from '../components/LocalProgress';
import ErrorMessagePanel from '../components/ErrorMessagePanel';
import ButtonContent from '../components/ButtonContent';

const SummaryPage = () => {
  const {id} = useParams();
  const parsedId = parseInt(id ?? '');

  const {summary, status, error} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<TopicContent[]>(summary.text);
  const [duration, setDuration] = useState<number>(0);
  const disabled = useMemo(() => !text.length || areObjectsEqual(summary.text, text), [summary.text, text]);

  const updateSummary = (index: number, updatedContent: Partial<TopicContent> | undefined) => {
    if(!updatedContent) {
      setText((value) => value.filter((_v, i) => i !== index));
    } else {
      setText((value) => value.map((content, i) => i === index ? {...content, ...updatedContent} : content));
    }
  };

  const sendUpdates = () => {
    const update: Summary = {...summary, text};
    dispatch(putSummaryChanges(update));
  };

  const onNewTopicAdd = () => {
    setText(text.concat(defaultTopic));
  };

  useEffect(() => {
    if(parsedId && summary.id !== parsedId) {
      dispatch(getSummary(parsedId));
    }
  }, [parsedId, dispatch]);

  useEffect(() => {
    if(summary.audioId) {
      dispatch(getAudioById(summary.audioId));
    }
  }, [summary.audioId, dispatch]);

  useEffect(() => {
    setText(summary.text);
  }, [summary.text, dispatch]);

  useEffect(() => {
    document.title = getPageTitle(summary.title);
  }, [summary.title])

  if(!summary.title) {
    if(status === 'pending') {
      return <LocalProgress />
    } else if(status === 'error') {
      return <ErrorMessagePanel error={error} errorIconType='summary' />
    }
  }

  return (
    <Stack
      display='flex'
      flexDirection='column'
      alignItems='center'>
        <Typography variant='h2' marginBottom='25px' width='70%'>{summary.title}</Typography>

        {summary.id === parsedId && summary.audio 
          ? <AudioPlayer audioUrl={summary.audio} duration={duration} updateDuration={(newDuration) => setDuration(newDuration)} />
          : <></>}
          
        <Typography variant='h2' marginBottom='25px'>Расшифровка</Typography>

        <Typography variant='error' marginBottom='10px'>{error}</Typography>

        <Stack width='100%' marginBottom='20px'>
          {        
            text.map((content, i) => (
              <TopicPlain 
                key={content.topic} 
                index={i} 
                content={content} 
                entireDuration={duration}
                updateSummary={updateSummary}/>
            ))
          }
          
          <Button
            variant='topic'
            fullWidth
            onClick={onNewTopicAdd}>
              +
          </Button>
        </Stack>

        <Stack
          display='flex'
          flexDirection='row'
          justifyContent='space-around'
          gap='5vw'
          sx={{
            [breakpoints.down('md')]: {
              width: '100%'
            },
            [breakpoints.up('md')]: {
              width: '60%'
            }
          }}>
            <DownloadButton summaryId={parsedId} summaryTitle={summary.title} />

            <Button 
              fullWidth
              variant='contained'
              disabled={disabled}
              onClick={sendUpdates}
              style={{
                display: summary.text ? 'inherit' : 'none',
                alignSelf: 'flex-end'
              }}>
                <ButtonContent content='Сохранить' status={status} />
            </Button>
        </Stack>
    </Stack>
  );
};

export default SummaryPage;
