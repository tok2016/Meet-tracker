import { CircularProgress, Stack } from '@mui/material';

const LocalProgress = () => (
  <Stack 
      display='flex'
      flexDirection='row'
      alignItems='center'
      width='100%' 
      height='40vh'>
        <CircularProgress color='primary' style={{margin: '0 auto'}} />
    </Stack>
);

export default LocalProgress;
