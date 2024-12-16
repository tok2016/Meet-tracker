import { Typography } from '@mui/material';

type TopicTimeCodesProps = {
  start: string,
  end: string,
  hidden?: boolean,
  changeTimeCode: (timeCode: string) => void
};

const TopicTimeCodes = ({start, end, hidden=false, changeTimeCode}: TopicTimeCodesProps) => (
  <div style={{display: hidden ? 'none' : 'block'}}>
    <Typography variant='h4' component='a' onClick={() => changeTimeCode(start)}>
      {start}
    </Typography>
    <Typography variant='h4' component='span'> - </Typography>
    <Typography variant='h4' component='a' onClick={() => changeTimeCode(end)}>
      {end}
    </Typography>
  </div>
);

export default TopicTimeCodes;
