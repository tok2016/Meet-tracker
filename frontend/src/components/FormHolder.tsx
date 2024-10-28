import { Paper } from '@mui/material';
import { ReactNode } from 'react';

const FormHolder = ({children}: {children: ReactNode}) => (
  <Paper 
    sx={(theme) => (theme.components?.MuiPaper ? {
      ...theme.components.MuiPaper?.defaultProps?.sx,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '70vh',
      width: '25vw',
      minHeight: 'fit-content',
      margin: '0 auto',
      marginTop: '5vh'
    } : {})}>
    {children}
  </Paper>
);

export default FormHolder;
