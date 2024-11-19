import { PauseCircleOutline, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Paper, Slider, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectTimeCode, setTimeCode } from '../store/timeCodeSlice';

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

  return (
    <Paper 
      variant='elevationSmall'
      sx={(theme) => theme.components?.MuiPaper
        ? ({
          ...theme.components.MuiPaper.defaultProps?.sx,
          display: audio.duration ? 'flex' : 'none',
          flexDirection: 'row',
          width: '50%',
          marginBottom: '30px',
          alignItems: 'center',
          gap: '2vw'
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
          width='5em'
          textAlign='left'
          variant='body2Highlight'>
          {secondsToTimeString(currentTime)}
        </Typography>
    </Paper>
  );
};

export default AudioPlayer;
