import { Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTimeCode } from '../../store/timeCodeSlice';

type TopicTimeCodesProps = {
  start: string,
  end: string,
  hidden?: boolean,
};

const timeStringToSeconds = (timeString: string, delimiter: string = ':'): number => {
  const values = timeString.split(delimiter).map((str) => parseFloat(str.replace(',', '.')));

  const seconds = values.reduce((prev, curr, i) => {
    const normalizedCurr = Math.ceil(curr) * Math.pow(60, values.length - 1 - i);
    return Math.ceil(prev) + normalizedCurr;
  }, 0);

  return seconds;
};

const TopicTimeCodes = ({start, end, hidden=false}: TopicTimeCodesProps) => {
  const dispatch = useAppDispatch();

  const changeTimeCode = (timeCode: string) => {
    const seconds = timeStringToSeconds(timeCode);
    console.log(seconds);
    dispatch(setTimeCode(seconds));
  };

  return (
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
}

export default TopicTimeCodes;
