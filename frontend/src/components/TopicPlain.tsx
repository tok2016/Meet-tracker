import { IconButton, Paper, Typography } from '@mui/material';
import { TurnLeft, TurnRight } from '@mui/icons-material';
import { useMemo, useReducer } from 'react';

import { Topic } from '../utils/types/Topic';
import TaskPlain from './TaskPlain';
import { TextColors } from '../utils/Colors';
import { PAPER_SMALL_PADDING } from '../utils/theme/Paper';

const formatTopic = (topic: string): Topic => {
  const formatted: Topic = {};

  const subtopics = topic.split('@');
  const keys = topic.match(/\/\w+[a-z]/g);

  if(keys) {
    keys.forEach((key) => {
      if(key !== 'teammate' && key !== 'task') {
        const txt = subtopics.find((t) => t.includes(key));
        if(txt) {
          formatted[key] = txt.replace(key, '').trim();
        }
      }
    });
  }

  return formatted;
};

const formatTasksList = (originalTasks: string): Topic[] => {
  const tasks: Topic[] = [];

  if(originalTasks) {
    const rawTasks = originalTasks.split('&');
    const teammates = rawTasks.filter((task) => task.includes('/teammate'));
    const tasksForTeammates = rawTasks.filter((task) => task.includes('/task'));
    teammates.forEach((teammate, i) => {
      tasks.push({
        ['id']: i.toString(),
        ['/teammate']: teammate.replace('/teammate', ''). trim(),
        ['/task']: tasksForTeammates[i].replace('/task', '').trim()
      });
    })
  }

  return tasks;
};

const TopicPlain = ({topic}: {topic: string}) => {
  const [isRolledDown, rollPlain] = useReducer((value) => !value, false);

  const topicFormatted = useMemo(() => formatTopic(topic), [topic]);
  const tasks = useMemo(() => formatTasksList(topicFormatted['/tasks']), [topicFormatted]);

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
          <Typography variant='h3'>
            {topicFormatted['/topic']} {topicFormatted['/start']} - {topicFormatted['/end']}
          </Typography>
        
          <Typography variant='body1'>
            {isRolledDown ? topicFormatted['/text'] : ''}
          </Typography>

          <Paper variant='elevationInside' style={{
            display: tasks.length && isRolledDown ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {tasks.map((task) => (
              <TaskPlain key={task['id']} task={task}/>
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
