import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import TopicPlain from '../components/TopicPlain';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getSummary } from '../store/summary/summaryThunks';

const SummaryPage = () => {
  const {id} = useParams();

  const {summary} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id && summary.id.toString() !== id) {
      dispatch(getSummary(id));
    }
  }, [id, dispatch, summary.id]);

  return (
    <>
      <Typography variant='h2' marginBottom='25px'>{summary.title}</Typography>
      <Typography variant='h2' marginBottom='25px'>Расшифровка</Typography>
      {        
        Object.entries(summary.text).map((pair) => (
          <TopicPlain key={pair[0]} topic={pair}/>
        ))
      }
    </>
  );
};

export default SummaryPage;
