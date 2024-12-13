import { Input, Paper, Stack, Typography } from '@mui/material';
import { memo, useMemo, useReducer, useState } from 'react';

import SpeakerPlain from './SpeakerPlain';
import TopicContent from '../../types/TopicContent';
import TextArea from '../TextArea';
import { breakpoints } from '../../theme/BasicTypography';
import { LgFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from '../../theme/FontSizes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTimeCode } from '../../store/timeCodeSlice';
import RollDownButton from './RollDownButton';
import { SpeakerWithIndex } from '../../types/SpeakerContent';
import useMediaMatch from '../../hooks/useMediaMacth';

const TYPE_TIMEOUT = 2500;

const timeStringToSeconds = (timeString: string, delimiter: string = ':'): number => {
  const values = timeString.split(delimiter).map((str) => parseFloat(str));
  const seconds = values.reduceRight((prev, curr, i) => {
    const normalizedCurr = Math.ceil(curr) * Math.pow(60, i);
    return Math.ceil(prev) + normalizedCurr;
  }, 0);

  return seconds;
};

type TopicPlainProps = {
  index: number,
  content: TopicContent, 
  updateSummary: (index: number, updatedContent: Partial<TopicContent>) => void,
};

const TopicPlainRaw = ({index, content, updateSummary}: TopicPlainProps) => {
  const [isRolledDown, rollPlain] = useReducer((value) => !value, false);

  const speakers = useMemo(() => (
    content.speakers.map((speaker, i): SpeakerWithIndex => ({...speaker, index: i}))
  ), [content]);

  const [customTitle, setCustomTitle] = useState<string>(content.topic);
  const [customText, setCustomText] = useState<string>(content.text);

  const dispatch = useAppDispatch();

  const {medium} = useMediaMatch();

  const changeTimeCode = (timeCode: string) => {
    dispatch(setTimeCode(timeStringToSeconds(timeCode)));
  };

  let timer: number | undefined = undefined;

  const commitChanges = (topic: string, text: string) => {
    timer = setTimeout(() => {
      updateSummary(index, {topic, text});
    }, TYPE_TIMEOUT);
  };

  const commitSpeakerChanges = (speaker: SpeakerWithIndex) => {
    timer = setTimeout(() => {
      updateSummary(index, {
        speakers: [...content.speakers.slice(0, speaker.index), speaker, ...content.speakers.slice(speaker.index + 1)]
      });
    }, TYPE_TIMEOUT);
  };

  const onKeyUp = () => {
    commitChanges(customTitle, customText);
  };

  const onKeyDown = () => {
    clearTimeout(timer);
  };

  if(!content.topic) {
    return;
  }

  return (
    <Paper 
      variant='elevationSmall'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        marginBottom: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: isRolledDown ? 'column' : 'row',
        justifyContent: 'center',
        gap: '15px'
      } : {})}>
          <Stack 
            display='flex' 
            flexDirection='row' 
            alignItems='center' 
            alignSelf='center' 
            gap='10px' 
            justifyContent='center'
            width='100%'>

            <Input
              type='text' 
              disableUnderline
              value={customTitle}
              itemType=''
              onChange={(evt) => setCustomTitle(evt.target.value)}
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
              sx={{
                fontWeight: 700,
                [breakpoints.down('sm')]: {
                  fontSize: XsFontSizes.h4
                },
                [breakpoints.up('sm')]: {
                  fontSize: SmFontSizes.h4
                },
                [breakpoints.up('lg')]: {
                  fontSize: LgFontSizes.h3
                },
                [breakpoints.only('xl')]: {
                  fontSize: XlFontSizes.h3
                },
                width: `${customTitle.length / 1.5}em`,
                maxWidth: '50%',
                '& .MuiInputBase-input': {
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }
              }} />

            <div style={{display: !medium ? 'block' : 'none'}}>
              <Typography variant='h3' component='a' onClick={() => changeTimeCode(content.start)}>
                {content.start}
              </Typography>
              <Typography variant='h3' component='span'> - </Typography>
              <Typography variant='h3' component='a' onClick={() => changeTimeCode(content.end)}>
                {content.end}
              </Typography>
            </div>
          </Stack>

          <div style={{display: isRolledDown && medium ? 'block' : 'none'}}>
            <Typography variant='h4' component='a' onClick={() => changeTimeCode(content.start)}>
              {content.start}
            </Typography>
            <Typography variant='h4' component='span'> - </Typography>
            <Typography variant='h4' component='a' onClick={() => changeTimeCode(content.end)}>
              {content.end}
            </Typography>
          </div>

          <TextArea 
            readOnly={false}
            variant='body1'
            hidden={!isRolledDown} 
            value={customText}
            onChange={(evt) => setCustomText(evt.target.value)}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}>
          </TextArea>

          <Paper variant='elevationInside' style={{
            display: speakers.length && isRolledDown ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {speakers.map((speaker) => (
              <SpeakerPlain 
                key={speaker.index} 
                speaker={speaker} 
                onKeyDown={onKeyDown} 
                commitChanges={commitSpeakerChanges}/>
            ))}
          </Paper>

          <RollDownButton isRolledDown={isRolledDown} rollPlain={rollPlain} />
    </Paper>
  );
};

const TopicPlain = memo(TopicPlainRaw);

export default TopicPlain;
