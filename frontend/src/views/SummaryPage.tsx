import { Button, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import TopicPlain from '../components/TopicPlain';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getSummary, putSummaryChanges } from '../store/summary/summaryThunks';
import { SummaryUpdate } from '../utils/types/Summary';
import TopicContent from '../utils/types/TopicContent';

const SummaryPage = () => {
  const {id} = useParams();

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
    const parsedId = parseInt(id ?? '');
    if(parsedId && summary.id !== parsedId) {
      dispatch(getSummary(parsedId));
    }
  }, [id, dispatch, summary.id]);

  return (
    <Stack
      display='flex'
      flexDirection='column'>
      <Typography variant='h2' marginBottom='25px'>{summary.title}</Typography>
      <Typography variant='h2' marginBottom='25px'>Расшифровка</Typography>
      {        
        summary.text.map((content, i) => (
          <TopicPlain 
            key={content.topic} 
            index={i} 
            content={content} 
            updateSummary={updateSummary}/>
        ))
      }
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
