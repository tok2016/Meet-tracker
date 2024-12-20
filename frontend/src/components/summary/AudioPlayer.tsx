import { PauseCircleOutline, PlayCircleOutline } from '@mui/icons-material';
import { CircularProgress, IconButton, Paper, Slider, Stack, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectTimeCode, setTimeCode } from '../../store/timeCodeSlice';
import { breakpoints } from '../../theme/BasicTypography';
import { selectSummary } from '../../store/summary/summarySlice';

const secondsToTimeString = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.ceil(timeInSeconds - minutes * 60);

  const minStr = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const secStr = seconds.toLocaleString(undefined, {minimumIntegerDigits: 2});

  return `${minStr}:${secStr}`;
};

const AudioPlayer = ({audioUrl}: {audioUrl: string}) => {
  const [audio] = useState<HTMLAudioElement>(new Audio(audioUrl));
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurretTime] = useState<number>(0);

  const {timeCode} = useAppSelector(selectTimeCode);
  const {audioStatus} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const onSliderChange = (_evt: Event | SyntheticEvent, value: number | number[]) => {
    dispatch(setTimeCode(typeof value === 'number' ? value : value[0]));
  };

  useEffect(() => {
    audio.onloadedmetadata = () => {
      setDuration(audio.duration)
    };

    audio.onpause = () => {
      setPlaying(false);
    };

    audio.ontimeupdate = () => {
      setCurretTime(audio.currentTime);
    }
  }, [audioUrl]);

  useEffect(() => {
    audio.currentTime = timeCode;
  }, [timeCode]);

  useEffect(() => {
    if(isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  if(audioStatus === 'pending') {
    return (
      <Stack width='100%' display='block'>
        <CircularProgress color='primary' sx={{margin: '0 auto'}} />
      </Stack>
    )
  }

  return (
    <Paper 
      variant='elevationSmall'
      sx={(theme) => theme.components?.MuiPaper
      ? ({
        ...theme.components.MuiPaper.defaultProps?.sx,
        display: audio.duration ? 'flex' : 'none',
        flexDirection: 'row',
        alignItems: 'center',
        [breakpoints.down('md')]: {
          width: '100%',
          marginBottom: '15px',
          gap: '3vw'
        },
        [breakpoints.only('md')]: {
          width: '70%',
          marginBottom: '20px',
          gap: '3vw'
        },
        [breakpoints.up('lg')]: {
          width: '50%',
          marginBottom: '30px',
          gap: '2vw'
        }
      }) : {}}>
        <IconButton 
          color='secondary'
          onClick={() => setPlaying(value => !value)}>
          {isPlaying ? <PauseCircleOutline sx={{width: '2em', height: '2em'}} /> : <PlayCircleOutline sx={{width: '2em', height: '2em'}} />}
        </IconButton>

        <Slider
          min={0}
          max={duration}
          value={currentTime}
          onChangeCommitted={onSliderChange} />

        <Typography 
          textAlign='left'
          variant='body2Highlight'
          width='5em'>
            {secondsToTimeString(currentTime)}
        </Typography>
    </Paper>
  );
};

export default AudioPlayer;
