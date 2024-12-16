import { CircularProgress, Stack } from '@mui/material';

const FullScreenProgress = () => (
  <Stack
    display='flex'
    flexDirection='row'
    alignItems='center'
    width='100vw'
    height='100vh'>
      <CircularProgress 
        color='primary'
        sx={{
          margin: '0 auto'
        }} />
  </Stack>
);

export default FullScreenProgress;
