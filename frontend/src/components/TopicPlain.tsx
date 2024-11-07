import { IconButton, Input, Paper, Stack, Typography } from '@mui/material';
import { TurnLeft, TurnRight } from '@mui/icons-material';
import { useMemo, useReducer, useState } from 'react';

import TaskPlain from './TaskPlain';
import { TextColors } from '../utils/Colors';
import { PAPER_SMALL_PADDING } from '../utils/theme/Paper';
import TopicContent from '../utils/types/TopicContent';
import TextArea from './TextArea';

const TopicPlain = ({topic}: {topic: [string, TopicContent]}) => {
  const [isRolledDown, rollPlain] = useReducer((value) => !value, false);

  const [title, content] = topic;

  const tasks = useMemo(() => content.tasks?.split(', '), [content]);

  const [customTitle, setCustomTitle] = useState<string>(title);
  const [customText, setCustomText] = useState<string>(content.text);
  const [customSpeakers, setCustomSpeakers] = useState<string>(content.speakers);

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
          <Stack direction='row' alignItems='center' alignSelf='center'>
            <Input
              type='text' 
              disableUnderline
              value={customTitle}
              itemType=''
              onChange={(evt) => setCustomTitle(evt.target.value)} />

            <Typography variant='body1'>
              {content.start} - {content.end}
            </Typography>
          </Stack>

          <TextArea 
            readOnly={false}
            variant='body1'
            hidden={!isRolledDown} 
            value={customText}
            setter={setCustomText}>
          </TextArea>

          <TextArea 
            readOnly={false}
            variant='body2'
            hidden={!isRolledDown} 
            value={customSpeakers}
            setter={setCustomSpeakers}>
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
