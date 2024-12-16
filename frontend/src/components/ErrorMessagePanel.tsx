import { Stack, Typography } from '@mui/material';

import ErrorIcon from './ErrorIcon';
import { ErrorIconType } from '../types/ErrorIconType';

const ErrorMessagePanel = ({error, errorIconType}: {error?: string, errorIconType: ErrorIconType}) => {
  return (
    <Stack 
      display='flex'
      flexDirection='column'
      gap='20px'
      alignItems='center'
      width='100%' 
      height='40vh'
      paddingTop='20vh'>
        <ErrorIcon type={errorIconType} />
        <Typography variant='h3'>{error}</Typography>
    </Stack>
  );
};

export default ErrorMessagePanel;
