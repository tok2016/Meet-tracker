import { Paper, Typography } from '@mui/material';

const PageStub = ({message}: {message: string}) => (
  <Paper>
    <Typography variant='h1'>{message}</Typography>
  </Paper>
);

export default PageStub;
