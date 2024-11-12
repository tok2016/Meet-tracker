import { Paper } from '@mui/material';
import { ReactNode } from 'react';

import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH } from '../utils/utils';

const FormHolder = ({children, isForAdmin=false}: {children: ReactNode, isForAdmin?: boolean}) => {
  const marginTop = useMediaValue(AVATAR_WIDTH);

  return (
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
        marginTop: isForAdmin ? 0 : `calc(${marginTop}px + 8vh)`
      } : {})}>
      {children}
    </Paper>
  );
};

export default FormHolder;
