import { IconButton, Stack, SxProps, Typography } from '@mui/material';
import { Check, Close, Edit } from '@mui/icons-material';
import { CSSProperties, useReducer, useState } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTimeCode } from '../../store/timeCodeSlice';
import UIColors from '../../utils/Colors';
import TimeCodeInput from './TimeCodeInput';

type TopicTimeCodesProps = {
  start: string,
  end: string,
  entireDuration: number,
  commitChange: (start: string, end: string) => void,
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

const secondsToHourTimeString = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);

  const secondsAfterHours = timeInSeconds - hours * 3600;
  const minutes = Math.floor(secondsAfterHours / 60);

  const seconds = Math.ceil(secondsAfterHours - minutes * 60);

  const hStr = hours.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const minStr = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const secStr = seconds.toLocaleString(undefined, {minimumIntegerDigits: 2});

  return `${hStr}:${minStr}:${secStr}`;
};

const TopicTimeCodes = ({start, end, entireDuration, hidden=false, commitChange}: TopicTimeCodesProps) => {
  const [startCode, setStartCode] = useState<string>(start);
  const [endCode, setEndCode] = useState<string>(end);
  const [isEditable, toggleEdit] = useReducer((value) => !value, false);

  const dispatch = useAppDispatch();

  const timeCodeButtonStyle: CSSProperties = {
    border: `1px solid ${UIColors.palette.disabledColor}`,
    borderRadius: 10,
    backgroundColor: UIColors.palette.backgroundColor
  };

  const timeCodeButtonIconSx: SxProps = {
    width: '1em', 
    height: '1em'
  };

  const changeTimeCode = (timeCode: string) => {
    const seconds = timeStringToSeconds(timeCode);
    dispatch(setTimeCode(seconds));
  };

  const cancelChange = () => {
    setStartCode(start);
    setEndCode(end);
    toggleEdit();
  };

  const applyChange = (start: string, end: string) => {
    commitChange(start, end);
    toggleEdit();
  };

  const setNewTimeCode = (newStartCode: string, newEndCode: string) => {
    const startSeconds = timeStringToSeconds(newStartCode);
    const endSeconds = timeStringToSeconds(newEndCode);

    const fixedStartSeconds = startSeconds > entireDuration ? entireDuration : startSeconds;
    const fixedEndSeconds = endSeconds > entireDuration ? entireDuration : endSeconds;

    const fixedStartCode = secondsToHourTimeString(fixedStartSeconds);
    const fixedEndCode = secondsToHourTimeString(fixedEndSeconds);

    if(fixedStartSeconds > fixedEndSeconds) {
      setStartCode(fixedEndCode);
      setEndCode(fixedStartCode);
    } else {
      setStartCode(fixedStartCode);
      setEndCode(fixedEndCode);
    }
  };

  return (
    <Stack
      display={hidden ? 'none' : 'flex'}
      position='relative'
      flexDirection='row'
      alignItems='center'
      gap='2px'>
        <TimeCodeInput
          timeCode={startCode}
          isEditable={isEditable}
          onChange={(evt) => setNewTimeCode(evt.target.value, endCode)}
          onClick={() => changeTimeCode(start)} />

        <Typography variant='h4' component='span'> - </Typography>

        <TimeCodeInput
          timeCode={endCode}
          isEditable={isEditable}
          onChange={(evt) => setNewTimeCode(startCode, evt.target.value)}
          onClick={() => changeTimeCode(end)} />

        { !isEditable
          ? <IconButton 
              color='secondary'
              style={timeCodeButtonStyle}
              onClick={toggleEdit}>
                <Edit sx={timeCodeButtonIconSx} />
            </IconButton>
          : <>
              <IconButton 
                color='secondary'
                style={timeCodeButtonStyle}
                onClick={() => applyChange(startCode, endCode)}>
                  <Check sx={timeCodeButtonIconSx} />
              </IconButton>
              <IconButton 
                color='secondary'
                style={timeCodeButtonStyle}
                onClick={cancelChange}>
                  <Close sx={timeCodeButtonIconSx} />
              </IconButton>
            </>
        }
    </Stack>
  );
}

export default TopicTimeCodes;
