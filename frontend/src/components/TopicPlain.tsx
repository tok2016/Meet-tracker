import { IconButton, Input, Paper, Stack, Typography } from '@mui/material';
import { TurnLeft, TurnRight } from '@mui/icons-material';
import { useMemo, useReducer, useState } from 'react';

import TaskPlain from './TaskPlain';
import { TextColors } from '../utils/Colors';
import { PAPER_SMALL_PADDING } from '../utils/theme/Paper';
import TopicContent from '../utils/types/TopicContent';
import TextArea from './TextArea';
import { breakpoints } from '../utils/theme/BasicTypography';
import { LgFontSizes, XlFontSizes } from '../utils/theme/FontSizes';
import { SummaryContent } from '../utils/types/Summary';

const TYPE_TIMEOUT = 2500;

type TopicPlainProps = {
  topic: [string, TopicContent], 
  updateSummary: (key: keyof SummaryContent, updatedContent: TopicContent) => void
};

const TopicPlain = ({topic, updateSummary}: TopicPlainProps) => {
  const [isRolledDown, rollPlain] = useReducer((value) => !value, false);

  const [title, content] = topic;

  const tasks = useMemo(() => content.tasks?.split(', '), [content]);

  const [customTitle, setCustomTitle] = useState<string>(content.topic);
  const [customText, setCustomText] = useState<string>(content.text);
  const [customSpeakers, setCustomSpeakers] = useState<string>(content.speakers);

  let timer: number | undefined = undefined;

  const onKeyUp = () => {
    timer = setTimeout(() => {
      updateSummary(title, {...content, topic: customTitle, text: customText, speakers: customSpeakers});
    }, TYPE_TIMEOUT);
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
                [breakpoints.up('lg')]: {
                  fontSize: LgFontSizes.h3
                },
                [breakpoints.only('xl')]: {
                  fontSize: XlFontSizes.h3
                },
                width: `${customTitle.length / 1.75}em`,
                maxWidth: '50%',
                '& .MuiInputBase-input': {
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }
              }} />

            <Typography variant='h3'>
              {content.start} - {content.end}
            </Typography>
          </Stack>

          <TextArea 
            readOnly={false}
            variant='body1'
            hidden={!isRolledDown} 
            value={customText}
            setter={setCustomText}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}>
          </TextArea>

          <TextArea 
            readOnly={false}
            variant='body2'
            hidden={!isRolledDown} 
            value={customSpeakers}
            setter={setCustomSpeakers}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}>
          </TextArea>

          <Paper variant='elevationInside' style={{
            display: tasks?.length && isRolledDown ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {tasks?.map((task, i) => (
              <TaskPlain key={Date.now() + i} task={task}/>
            ))}
          </Paper>

          <IconButton
            style={{
              alignSelf: 'flex-end',
              width: '1.5em',
              height: '1.5em',
              position: isRolledDown ? 'relative' : 'absolute',
              right: isRolledDown ? undefined : PAPER_SMALL_PADDING,
              top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING} / 2)`
            }}
            color='secondary'
            onClick={rollPlain}>
            {isRolledDown 
            ? <TurnLeft 
              sx={{
                rotate: '90deg',
                color: TextColors.main
              }}/>
            : <TurnRight sx={{
                rotate: '90deg',
                color: TextColors.main
              }}/>
            }
          </IconButton>
    </Paper>
  );
};

export default TopicPlain;
