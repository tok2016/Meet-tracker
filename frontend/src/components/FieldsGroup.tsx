import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { breakpoints } from '../theme/BasicTypography';

const FieldsGroup = ({children}: {children: ReactNode}) => (
  <Stack
    display='flex'
    flexDirection='column'
    maxHeight='53vh'
    sx={{
      overflowY: 'auto',
      padding: '0 5px 10px',
      paddingTop: '0.5em',  
      [breakpoints.down('md')]: {
        gap: '4.5vh'
      },
      [breakpoints.up('md')]: {
        gap: '3.5vh'
      }
    }}>
    {children}
  </Stack>
);

export default FieldsGroup;
