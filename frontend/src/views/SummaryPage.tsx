import { Button, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import TopicPlain from '../components/TopicPlain';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getAudioById, getSummary, putSummaryChanges } from '../store/summary/summaryThunks';
import { SummaryUpdate } from '../types/Summary';
import TopicContent from '../types/TopicContent';
import AudioPlayer from '../components/AudioPlayer';
import DownloadButton from '../components/DownloadButton';

const SummaryPage = () => {
  const {id} = useParams();
  const parsedId = parseInt(id ?? '');

  const {summary} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<TopicContent[]>(summary.text);
  const disabled = useMemo(() => JSON.stringify(summary.text) === JSON.stringify(text), [summary.text, text]);

  const updateSummary = (index: number, updatedContent: TopicContent) => {
    setText((value) => value.map((content, i) => i === index ? updatedContent : content));
  };

  const sendUpdates = () => {
    const update: SummaryUpdate = {
      id: summary.id,
      title: summary.title,
      text
    }
    dispatch(putSummaryChanges(update));
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
  }, [summary.audioId]);

  return (
    <Stack
      display='flex'
      flexDirection='column'
      alignItems='center'>

      <Stack width='100%' position='relative'>
        <Typography variant='h2' marginBottom='25px' width='70%'>{summary.title}</Typography>

        <div style={{
          position: 'absolute',
          right: 0,
          top: 0
        }}>
          <DownloadButton summaryId={parsedId} summaryTitle={summary.title} />
        </div>
      </Stack>

      {summary.id === parsedId && summary.audio 
        ? <AudioPlayer audioUrl={summary.audio} />
        : <></>}
        
      <Typography variant='h2' marginBottom='25px'>Расшифровка</Typography>

      <Stack width='100%'>
        {        
          summary.text.map((content, i) => (
            <TopicPlain 
              key={content.topic} 
              index={i} 
              content={content} 
              updateSummary={updateSummary}/>
          ))
        }
      </Stack>

      <Button 
        variant='containtedSecondary'
        disabled={disabled}
        onClick={sendUpdates}
        style={{
          display: summary.text ? 'inherit' : 'none',
          alignSelf: 'flex-end'
        }}>
          Сохранить
      </Button>
    </Stack>
  );
};

export default SummaryPage;
