import { Paper, Typography } from '@mui/material';

import { Topic } from '../utils/types/Topic';
import { useMemo } from 'react';

const TaskPlain = ({task}: {task: Topic}) => {
  const tasksList = useMemo(() => task['/task'].split(/[\d].\s/), [task]);
  const orderedTasks = tasksList.map((item, i) => ({
    id: i,
    task: item
  }));

  return (
    <Paper variant='elevationSmall'>
      <Typography variant='h4'>
        {task['/teammate']}
      </Typography>
        <ol type='1'>
          {orderedTasks.map((oTask) => (
            <li key={oTask.id} hidden={oTask.task.length <= 0}>
              <Typography variant='body1'>{oTask.task}</Typography>
            </li>
          ))}
        </ol>
    </Paper>
  );
};

export default TaskPlain;
