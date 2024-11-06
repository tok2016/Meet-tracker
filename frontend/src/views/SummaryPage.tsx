import { Typography } from '@mui/material';
//import { useParams } from 'react-router-dom';
//import { useEffect } from 'react';

import TopicPlain from '../components/TopicPlain';
//import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
//import { selectSummary } from '../store/summary/summarySlice';
//import { getSummary } from '../store/summary/summaryThunks';
import mockSummary from './example.json';

//const MIN_TOPIC_LENGTH = 3;

const SummaryPage = () => {
  //const {id} = useParams();

  //const {summary} = useAppSelector(selectSummary);
  //const dispatch = useAppDispatch();

  const mockTitle = 'Meeting 1';

  /*useEffect(() => {
    if(id && summary.id.toString() !== id) {
      dispatch(getSummary(id));
    }
  }, [id, dispatch, summary.id]);*/

  return (
    <>
      <Typography variant='h2' marginBottom='25px'>{mockTitle}</Typography>
      <Typography variant='h2' marginBottom='25px'>Расшифровка</Typography>
      {
        /*id === 'mock' 
        ? topics.map((topic) => (
            topic.topic.length <= MIN_TOPIC_LENGTH || <TopicPlain topic={topic.topic} key={topic.id}/>
          ))
        : <Paper>
            <Typography variant='body1' style={{whiteSpace: 'pre-line'}}>{mockSummaryTest}</Typography>
          </Paper>*/
        
        Object.entries(mockSummary).map((pair) => (
          <TopicPlain key={pair[0]} topic={pair}/>
        ))
      }
    </>
  );
};

export default SummaryPage;
