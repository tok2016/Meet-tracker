import { Paper, Typography } from '@mui/material';

type Task = {
  speaker: string,
  task: string
};

const TaskPlain = ({task}: {task: string | Task}) => {
  if(typeof task === 'string') {
    return (
      <Paper variant='elevationSmall'>
        <Typography variant='body1'>
          {task}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant='elevationSmall'>
      <Typography variant='h4'>
        {task.speaker}
      </Typography>
      <Typography variant='body1'>{task.task}</Typography>
    </Paper>
  )
};

export default TaskPlain;
