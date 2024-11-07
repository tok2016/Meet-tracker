import { Stack } from '@mui/material';
import { ReactNode } from 'react';

const FieldsGroup = ({children}: {children: ReactNode}) => (
  <Stack
    display='flex'
    flexDirection='column'
    gap='3.5vh'
    maxHeight='53vh'
    sx={{
      overflowY: 'auto',
      padding: '0 5px 10px',
      paddingTop: '0.5em',  
    }}>
    {children}
  </Stack>
);

export default FieldsGroup;
